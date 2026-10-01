ALTER TABLE Administrador
    ADD CONSTRAINT pk_administrador PRIMARY KEY (idAdmin),
    ADD CONSTRAINT uq_administrador_nombre_usuario UNIQUE (nombreUsuario),
    ADD CONSTRAINT chk_administrador_nombre_usuario
    CHECK (char_length(nombreUsuario) BETWEEN 5 AND 10),
    ADD CONSTRAINT chk_administrador_contrasena
    CHECK (char_length(contrasena) >= 12);

ALTER TABLE Cliente
    ADD CONSTRAINT pk_cliente PRIMARY KEY (idCliente),
    ADD CONSTRAINT chk_cliente_telefono
    CHECK (telefono ~ '^[0-9]{8}$'),
    ADD CONSTRAINT chk_cliente_monto_pago
    CHECK (montoPago BETWEEN 0 AND 10000),
    ADD CONSTRAINT chk_cliente_tipo_entrada
    CHECK (tipoEntrada IN ('mensual', 'semanal', 'sesión')),
    ADD CONSTRAINT chk_cliente_tipo_pago
    CHECK (tipoPago IN ('efectivo', 'QR'));

ALTER TABLE Cliente
    ALTER COLUMN fechaRegistro SET DEFAULT CURRENT_TIMESTAMP;

-- Permite que PostgreSQL genere IDs de clientes sin colisiones en solicitudes simultáneas.
CREATE SEQUENCE cliente_idcliente_seq;

ALTER TABLE Cliente
    ALTER COLUMN idCliente SET DEFAULT nextval('cliente_idcliente_seq');
