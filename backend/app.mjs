import express from 'express';
import cors from 'cors';
import { login, loginAdmin, crearPartida, registrarResultados, finalizarPartida, obtenerProgreso, crearAdmin, obtenerAdmins, darBajaAdmin, cambiarPasswordAdmin, crearAlumno, obtenerAlumnos, darBajaAlumno, obtenerEstadisticasGenerales, obtenerEstadisticasAlumno } from './juego_db.mjs';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    try {
        const { pin } = req.body;
        if (!pin) return res.status(400).json({exito: false, mensaje: "PIN es requerido"});
        
        const result = await login(pin);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({exito: false, mensaje: "Email y contraseña requeridos"});
        
        const result = await loginAdmin(email, password);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.get('/admin/list', async (req, res) => {
    try {
        const result = await obtenerAdmins();
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.post('/admin/crear', async (req, res) => {
    try {
        const { nombre, contrasena } = req.body;
        if (!nombre || !contrasena) return res.status(400).json({exito: false, mensaje: "Faltan datos requeridos"});
        const result = await crearAdmin(nombre, contrasena);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.delete('/admin/baja/:id', async (req, res) => {
    try {
        const result = await darBajaAdmin(req.params.id);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.put('/admin/password/:id', async (req, res) => {
    try {
        const { contrasena } = req.body;
        const result = await cambiarPasswordAdmin(req.params.id, contrasena);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.get('/alumno/list', async (req, res) => {
    try {
        const result = await obtenerAlumnos();
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.post('/alumno/crear', async (req, res) => {
    try {
        const { nombre, edad } = req.body;
        if (!nombre || !edad) return res.status(400).json({exito: false, mensaje: "Faltan datos requeridos"});
        const result = await crearAlumno(nombre, edad);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.put('/alumno/baja/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await darBajaAlumno(id);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.post('/partida', async (req, res) => {
    try {
        const { id_alumno } = req.body;
        const result = await crearPartida(id_alumno);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.post('/resultado', async (req, res) => {
    try {
        const { id_partida, id_nivel, resultados } = req.body;
        const result = await registrarResultados(id_partida, id_nivel, resultados);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.put('/partida/finalizar', async (req, res) => {
    try {
        const { id_partida } = req.body;
        const result = await finalizarPartida(id_partida);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.get('/progreso/:id_alumno', async (req, res) => {
    try {
        const { id_alumno } = req.params;
        const result = await obtenerProgreso(id_alumno);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.get('/estadisticas/general', async (req, res) => {
    try {
        const { edad } = req.query;
        const result = await obtenerEstadisticasGenerales(edad);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

app.get('/estadisticas/alumno/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await obtenerEstadisticasAlumno(id);
        res.json(result);
    } catch (e) {
        res.status(500).json({exito: false, mensaje: e.message});
    }
});

if (process.env.AWS_LAMBDA_FUNCTION_NAME === undefined) {
    const port = process.env.PORT ?? 5000;
    app.listen(port, () => {
        console.log(`Servidor de desarrollo local esperando en puerto: ${port}`);
    });
}

export default app;
