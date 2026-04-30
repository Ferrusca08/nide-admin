import mysql from 'mysql2/promise';

let pool;
let migrated = false;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: 'bd-proyectobloque.cdi7qyhr0arn.us-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'BDproyecto123',
      database: 'bd_juego',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    // Migración: agregar columna activo si no existe
    if (!migrated) {
      try {
        await pool.query('ALTER TABLE Alumno ADD COLUMN activo TINYINT(1) NOT NULL DEFAULT 1');
      } catch (e) {
        // Columna ya existe, ignorar error
      }
      migrated = true;
    }
  }
  return pool;
}

export async function login(pin) {
    const connection = await getPool();
    // Validate PIN and get alumno details
    const [alumnos] = await connection.query('SELECT id_alumno, nombre FROM Alumno WHERE pin = ?', [pin]);
    
    if (alumnos.length === 0) {
        return { exito: false, mensaje: "PIN incorrecto" };
    }
    
    const alumno = alumnos[0];
    
    // Check active game
    const [partidas] = await connection.query('SELECT id_partida FROM Partida WHERE id_alumno = ? AND estado = "activa"', [alumno.id_alumno]);
    
    let id_partida = null;
    let ultimo_nivel = 0;
    
    if (partidas.length > 0) {
        id_partida = partidas[0].id_partida;
        
        // Find max completed level
        const [niveles] = await connection.query('SELECT MAX(id_nivel) as ultimo FROM Partida_Nivel WHERE id_partida = ? AND completado = TRUE', [id_partida]);
        if (niveles.length > 0 && niveles[0].ultimo !== null) {
            ultimo_nivel = niveles[0].ultimo;
        }
    }
    
    return {
        exito: true,
        id_alumno: alumno.id_alumno,
        nombre: alumno.nombre,
        id_partida: id_partida,
        ultimo_nivel: ultimo_nivel
    };
}

export async function loginAdmin(nombre, contrasena) {
    const connection = await getPool();
    const [admins] = await connection.query('SELECT id_admin, nombre FROM Administrador WHERE nombre = ? AND contrasena = ?', [nombre, contrasena]);
    
    if (admins.length === 0) {
        return { exito: false, mensaje: "Credenciales incorrectas" };
    }
    
    return {
        exito: true,
        id_admin: admins[0].id_admin,
        nombre: admins[0].nombre
    };
}

export async function crearAdmin(nombre, contrasena) {
    const connection = await getPool();
    const [resultado] = await connection.query('INSERT INTO Administrador (nombre, contrasena, fecha_reg) VALUES (?, ?, CURDATE())', [nombre, contrasena]);
    return { exito: true, id_admin: resultado.insertId };
}

export async function obtenerAdmins() {
    const connection = await getPool();
    const [admins] = await connection.query('SELECT id_admin, nombre, fecha_reg FROM Administrador');
    return { exito: true, admins };
}

export async function darBajaAdmin(id_admin) {
    const connection = await getPool();
    const [result] = await connection.query('DELETE FROM Administrador WHERE id_admin = ?', [id_admin]);
    if (result.affectedRows === 0) {
        return { exito: false, mensaje: 'Administrador no encontrado' };
    }
    return { exito: true, mensaje: 'Administrador eliminado exitosamente' };
}

export async function cambiarPasswordAdmin(id_admin, nueva_contrasena) {
    const connection = await getPool();
    const [result] = await connection.query('UPDATE Administrador SET contrasena = ? WHERE id_admin = ?', [nueva_contrasena, id_admin]);
    if (result.affectedRows === 0) {
        return { exito: false, mensaje: 'Administrador no encontrado' };
    }
    return { exito: true, mensaje: 'Contraseña actualizada' };
}

export async function crearAlumno(nombre, edad) {
    const connection = await getPool();
    let pin;
    let pinUnico = false;
    
    while (!pinUnico) {
        pin = Math.floor(1000 + Math.random() * 9000).toString();
        const [existe] = await connection.query('SELECT id_alumno FROM Alumno WHERE pin = ?', [pin]);
        if (existe.length === 0) {
            pinUnico = true;
        }
    }
    
    const [resultado] = await connection.query('INSERT INTO Alumno (nombre, edad, fecha_reg, pin) VALUES (?, ?, CURDATE(), ?)', [nombre, edad, pin]);
    return { exito: true, id_alumno: resultado.insertId, pin: pin };
}

export async function obtenerAlumnos() {
    const connection = await getPool();
    const query = `
        SELECT a.id_alumno, a.nombre, a.edad, DATE_FORMAT(a.fecha_reg, '%Y-%m-%d') as fecha_reg, a.pin,
               COUNT(DISTINCT p.id_partida) as partidas,
               MAX(pn.id_nivel) as nivel
        FROM Alumno a
        LEFT JOIN Partida p ON a.id_alumno = p.id_alumno
        LEFT JOIN Partida_Nivel pn ON p.id_partida = pn.id_partida AND pn.completado = TRUE
        WHERE a.activo = 1
        GROUP BY a.id_alumno
    `;
    const [stats] = await connection.query(query);
    return { exito: true, alumnos: stats };
}

export async function darBajaAlumno(id_alumno) {
    const connection = await getPool();
    const [result] = await connection.query('UPDATE Alumno SET activo = 0 WHERE id_alumno = ?', [id_alumno]);
    if (result.affectedRows === 0) {
        return { exito: false, mensaje: 'Alumno no encontrado' };
    }
    return { exito: true, mensaje: 'Alumno dado de baja correctamente' };
}

export async function obtenerEstadisticasGenerales(edadRaw = null) {
    const connection = await getPool();
    
    let whereParams = [];
    let qEdad = '';
    if (edadRaw && edadRaw !== 'Todas') {
        qEdad = 'WHERE a.edad = ?';
        whereParams.push(parseInt(edadRaw));
    }

    const [desempenoNiveles] = await connection.query(`
        SELECT n.numero_nivel, 
               IFNULL(n.descripcion, CONCAT('Nivel ', n.numero_nivel)) as name, 
               GREATEST(0, CAST(100 - (IFNULL(AVG(rp.desaciertos), 0) * 10) AS SIGNED)) as aciertos
        FROM Nivel n
        LEFT JOIN Pregunta p ON n.id_nivel = p.id_nivel
        LEFT JOIN (
            SELECT rpx.id_pregunta, rpx.desaciertos 
            FROM Resultado_Pregunta rpx 
            JOIN Partida pa ON rpx.id_partida = pa.id_partida 
            JOIN Alumno a ON pa.id_alumno = a.id_alumno 
            ${qEdad}
        ) rp ON p.id_pregunta = rp.id_pregunta
        GROUP BY n.id_nivel, n.numero_nivel, n.descripcion
        ORDER BY n.numero_nivel
    `, whereParams);

    const [desempenoEdad] = await connection.query(`
        SELECT a.edad, 
               IFNULL(AVG(rp.desaciertos), 0) as promedio_errores
        FROM Alumno a
        JOIN Partida p ON a.id_alumno = p.id_alumno
        JOIN Resultado_Pregunta rp ON p.id_partida = rp.id_partida
        GROUP BY a.edad
    `);

    // we need to multiply whereParams depending on usage in totales.
    let paramTotales = [];
    if (whereParams.length > 0) { paramTotales = [whereParams[0], whereParams[0]]; } // used twice

    const [totales] = await connection.query(`
        SELECT 
            (SELECT COUNT(*) FROM Partida p JOIN Alumno a ON p.id_alumno = a.id_alumno ${qEdad}) as partidas_jugadas,
            (SELECT IFNULL(AVG(desaciertos), 0) FROM Resultado_Pregunta rp JOIN Partida p ON rp.id_partida = p.id_partida JOIN Alumno a ON p.id_alumno = a.id_alumno ${qEdad}) as promedio_errores_global
    `, paramTotales);

    const [riesgo] = await connection.query(`
        SELECT r.id_alumno, r.nombre, r.edad, r.errores_iniciales, r.errores_finales 
        FROM (
            SELECT a.id_alumno, a.nombre, a.edad,
            (SELECT IFNULL(SUM(rp.desaciertos), 0) FROM Resultado_Pregunta rp WHERE rp.id_partida = (SELECT id_partida FROM Partida WHERE id_alumno = a.id_alumno ORDER BY fecha_inicio ASC LIMIT 1)) as errores_iniciales,
            (SELECT IFNULL(SUM(rp.desaciertos), 0) FROM Resultado_Pregunta rp WHERE rp.id_partida = (SELECT id_partida FROM Partida WHERE id_alumno = a.id_alumno ORDER BY fecha_inicio DESC LIMIT 1)) as errores_finales,
            (SELECT COUNT(*) FROM Partida p WHERE p.id_alumno = a.id_alumno) as num_partidas
        FROM Alumno a
        ) as r
        WHERE r.num_partidas >= 2 AND r.errores_finales > r.errores_iniciales
        ${edadRaw && edadRaw !== 'Todas' ? ' AND r.edad = ?' : ''}
    `, whereParams);

    return { 
        exito: true, 
        niveles: desempenoNiveles, 
        por_edad: desempenoEdad, 
        totales: totales[0], 
        infantes_riesgo: riesgo 
    };
}

export async function obtenerEstadisticasAlumno(id_alumno) {
    const connection = await getPool();

    const [evolucion] = await connection.query(`
        SELECT p.id_partida, DATE_FORMAT(p.fecha_inicio, '%a %H:%i') as day,
               IFNULL(SUM(rp.desaciertos), 0) as time
        FROM Partida p
        LEFT JOIN Resultado_Pregunta rp ON p.id_partida = rp.id_partida
        WHERE p.id_alumno = ?
        GROUP BY p.id_partida, p.fecha_inicio
        ORDER BY p.fecha_inicio ASC
        LIMIT 10
    `, [id_alumno]);

    const [erroresPorNivel] = await connection.query(`
        SELECT n.numero_nivel as nivel, n.descripcion, IFNULL(SUM(rp.desaciertos), 0) as errores
        FROM Partida p
        JOIN Resultado_Pregunta rp ON p.id_partida = rp.id_partida
        JOIN Pregunta pr ON rp.id_pregunta = pr.id_pregunta
        JOIN Nivel n ON pr.id_nivel = n.id_nivel
        WHERE p.id_alumno = ?
        GROUP BY n.id_nivel, n.numero_nivel, n.descripcion
    `, [id_alumno]);

    const [distribucion] = await connection.query(`
        SELECT pr.enunciado as name, IFNULL(SUM(rp.desaciertos), 0) as value
        FROM Partida p
        JOIN Resultado_Pregunta rp ON p.id_partida = rp.id_partida
        JOIN Pregunta pr ON rp.id_pregunta = pr.id_pregunta
        WHERE p.id_alumno = ?
        GROUP BY pr.id_pregunta, pr.enunciado
        ORDER BY value DESC
        LIMIT 5
    `, [id_alumno]);

    const colors = ['#F44336', '#FF9800', '#FFEB3B', '#2196F3', '#4CAF50'];
    const pieData = distribucion.map((d, i) => ({ ...d, color: colors[i % colors.length] }));

    const [perfil] = await connection.query('SELECT nombre, edad FROM Alumno WHERE id_alumno = ?', [id_alumno]);

    return { 
        exito: true, 
        perfil: perfil[0] || {},
        evolucion: evolucion, 
        errores_nivel: erroresPorNivel, 
        peores_silabas: pieData 
    };
}

export async function crearPartida(id_alumno) {
    const connection = await getPool();
    // Validate that no active game exists
    const [existente] = await connection.query('SELECT id_partida FROM Partida WHERE id_alumno = ? AND estado = "activa"', [id_alumno]);
    
    if (existente.length > 0) {
        return { exito: false, mensaje: "Ya tienes una partida activa" };
    }
    
    const [resultado] = await connection.query('INSERT INTO Partida (fecha_inicio, estado, id_alumno) VALUES (NOW(), "activa", ?)', [id_alumno]);
    
    return {
        exito: true,
        id_partida: resultado.insertId
    };
}

export async function registrarResultados(id_partida, id_nivel, resultados) {
    const connection = await getPool();
    
    // Iterate over array of results
    if (resultados && resultados.length > 0) {
        for (const res of resultados) {
            await connection.query('INSERT INTO Resultado_Pregunta (desaciertos, id_partida, id_pregunta) VALUES (?, ?, ?)', 
            [res.desaciertos, id_partida, res.id_pregunta]);
        }
    }
    
    // Insert or update Partida_Nivel
    await connection.query(`
        INSERT INTO Partida_Nivel (id_partida, id_nivel, completado) 
        VALUES (?, ?, TRUE) 
        ON DUPLICATE KEY UPDATE completado = TRUE
    `, [id_partida, id_nivel]);
    
    return { exito: true, mensaje: "Resultados guardados correctamente" };
}

export async function finalizarPartida(id_partida) {
    const connection = await getPool();
    await connection.query('UPDATE Partida SET estado = "finalizada", fecha_fin = NOW() WHERE id_partida = ?', [id_partida]);
    return { exito: true, mensaje: "Partida finalizada" };
}

export async function obtenerProgreso(id_alumno) {
    const connection = await getPool();
    const [partidas] = await connection.query('SELECT id_partida FROM Partida WHERE id_alumno = ? AND estado = "activa"', [id_alumno]);
    
    if (partidas.length === 0) {
        return { Error: "No hay partida activa" };
    }
    
    const id_partida = partidas[0].id_partida;
    const [niveles] = await connection.query('SELECT id_nivel FROM Partida_Nivel WHERE id_partida = ? AND completado = TRUE', [id_partida]);
    
    return {
        id_partida: id_partida,
        niveles_completados: niveles.map(n => n.id_nivel)
    };
}

export default { getPool };
