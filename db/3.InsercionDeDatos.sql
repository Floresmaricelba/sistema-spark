INSERT INTO Administrador (idAdmin, nombreAdmin, contrasena, nombreUsuario)
VALUES (1, 'Administrador Flores', 'floresadmi06', 'floresadm');

INSERT INTO Cliente
    (idCliente, nombreCliente, telefono, montoPago, tipoEntrada, tipoPago)
VALUES
    (1, 'Ana María Pérez', '71234567', 250.00, 'mensual', 'efectivo'),
    (2, 'Bruno Fernández', '72345678', 120.00, 'semanal', 'QR'),
    (3, 'Carla Rodríguez', '73456789', 30.00, 'sesión', 'efectivo'),
    (4, 'Diego Martínez', '74567890', 250.00, 'mensual', 'QR'),
    (5, 'Elena Gutiérrez', '75678901', 120.00, 'semanal', 'efectivo'),
    (6, 'Fernando Castillo', '76789012', 30.00, 'sesión', 'QR'),
    (7, 'Gabriela Vargas', '77890123', 250.00, 'mensual', 'efectivo'),
    (8, 'Hugo Salazar', '78901234', 120.00, 'semanal', 'QR'),
    (9, 'Irene Mendoza', '79012345', 30.00, 'sesión', 'efectivo'),
    (10, 'Jorge Aguilar', '70123456', 250.00, 'mensual', 'QR');

-- Sincroniza la secuencia después de insertar IDs explícitos de prueba.
SELECT setval(
    'cliente_idcliente_seq',
    COALESCE((SELECT MAX(idCliente) FROM Cliente), 1)
);
