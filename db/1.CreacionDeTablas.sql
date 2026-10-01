CREATE TABLE Administrador (
    idAdmin INTEGER,
    nombreAdmin VARCHAR(100),
    contrasena VARCHAR(255),
    nombreUsuario VARCHAR(10)
);

CREATE TABLE Cliente (
    idCliente INTEGER,
    nombreCliente VARCHAR(100),
    telefono VARCHAR(8),
    montoPago NUMERIC(10, 2),
    tipoEntrada VARCHAR(10),
    tipoPago VARCHAR(10),
    fechaRegistro TIMESTAMP
);
