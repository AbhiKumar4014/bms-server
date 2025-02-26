const config = {
    db: {
        user: "sa",
        pass: "bms-server@123",
        name: "bms",
        host: "192.168.2.21",
        port: 1433,
        dialect: "mssql",
        connectionLimit: 5,
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    },
    jwtSecretKey: '@pnk',
};

export default config;
