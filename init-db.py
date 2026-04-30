import pymysql

sql = """
-- =============================================
-- base de datos juego educativo
-- =============================================

DROP DATABASE IF EXISTS bd_juego;
CREATE DATABASE bd_juego;
USE bd_juego;

-- =============================================
-- tablas
-- =============================================

CREATE TABLE Administrador (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_reg DATE NOT NULL
);

CREATE TABLE Alumno (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    fecha_reg DATE NOT NULL,
    pin CHAR(4) NOT NULL UNIQUE
);

CREATE TABLE Nivel (
    id_nivel INT PRIMARY KEY,
    numero_nivel INT NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE Pregunta (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    enunciado VARCHAR(100) NOT NULL,
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_nivel) REFERENCES Nivel(id_nivel)
);

CREATE TABLE Partida (
    id_partida INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    estado ENUM('activa', 'pausada', 'finalizada') NOT NULL DEFAULT 'activa',
    id_alumno INT NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES Alumno(id_alumno)
);

-- tabla intermedia para progreso por nivel
CREATE TABLE Partida_Nivel (
    id_partida INT NOT NULL,
    id_nivel INT NOT NULL,
    completado BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id_partida, id_nivel),
    FOREIGN KEY (id_partida) REFERENCES Partida(id_partida),
    FOREIGN KEY (id_nivel) REFERENCES Nivel(id_nivel)
);

CREATE TABLE Resultado_Pregunta (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    desaciertos INT NOT NULL DEFAULT 0,
    id_partida INT NOT NULL,
    id_pregunta INT NOT NULL,
    FOREIGN KEY (id_partida) REFERENCES Partida(id_partida),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta)
);
"""

print("Connecting to RDS...")
connection = pymysql.connect(
    host='bd-proyectobloque.cdi7qyhr0arn.us-east-1.rds.amazonaws.com',
    user='admin',
    password='BDproyecto123',
    port=3306,
    client_flag=pymysql.constants.CLIENT.MULTI_STATEMENTS
)

try:
    with connection.cursor() as cursor:
        print("Executing schema...")
        cursor.execute(sql)
        connection.commit()
        print("Schema execution finished!")
        
        cursor.execute("SHOW TABLES FROM bd_juego")
        tables = cursor.fetchall()
        print("Tables created:")
        for table in tables:
            print("-", table[0])
finally:
    connection.close()
