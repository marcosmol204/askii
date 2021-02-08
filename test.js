// const jwt = require('jsonwebtoken');

// const createToken = async () => {
//   const options = { algorithm: 'RS256' };
//   const payload = {
//     iss: '3MVG9dCCPs.KiE4R16CAedeG5hPuZ7nJgdDXGpWHlRrY7NpCj7xTE9Ok.EiORw9t6VQ6YYAE3KV95PB5nD72F',
//     aud: 'https://test.salesforce.com',
//     sub: 'web@jewishuae.com.devsb2',
//   };
//   const secret = 'MIIEogIBAAKCAQEAtyIXGwF3anSv+T+pDsmBnTglaU7LiuGqTPUzsFNDsSseaf+wazJFqDKMhMOnu4AmU / 1Vt0DyoZ86dgFAb2r82GPUXz44VT / Engc0TlaZsIwmDE9QMkBXC + MKb3XzGdYD4aXtKLojTFP3VwMMZcS7Hn5Lp8uBjwF + u11 + sqfKGqQp6vT6bg7CgPzfWvb2IHjJMFs9aXZ / 7Lt / q + NnTtJ7Z0vE6dTTbYROdxMXe3CJoeM7jVrSdWhQrPEmd / liijxN / UKpSMOWfo2z8gKM3mG7S7EzctmupprxzYT + baCSfiFM4u1QuRj3lCeTvalqUMss8HHgkEUOpx0MUGnt6xcwEQIDAQABAoIBADW / 0K5BcO4Sz29FSvYnGF6vkvNkiAL8FsK9mO0gkxaVxDhyLjJYL++c3nc9AabbhuRRz22Yp13eYQcveNz6trlAG53Uoi4LKEcFcEmpyzPw / l3QjYYiMiov + eka4j3r / Xml / IRelWuanVaxc1sPMahSgxv9c8ooMy0E1OHUs1G769NHM0Vi0hoIOnd4hJyzeyPpa86UZG7im2nDjT8Wq1JIB2TeJrljSTrK76Znlv9fu0m + 4Lt8wEyFdvr / RENde4TLHkBlTFMWRt7yZW1urWuK6sUFeBeAphD1QBinmSDBhO / TESa7sk / d7CpIUU6dwY7aT9pAMxWNZTjIbuh67gECgYEA35VMp4ZMpgJnYgdKN4TBMrVGSNnKdyktn73OERg1nn9Ez4dAP + GbWZThUBvaJojGPiLg8vc + b2aRZw8GK / AiE6Qpz20uxtS61lG + exq3Wl / Czth3aY36nN0 / ktQ / goz0OOVrIIFGvdPVDQ3AWsjD3X5JuWht7duoaasyEwfVz + ECgYEA0a9p3tDWu99gXc06C76m94Z68kx1YxNXb8hn5I8DQejZAbKFTY9sZu2O5YAmzGnL45A36Cpc / Vp5TshOZ1FszIf9YWdfWjSn6vxBMIzshtKqhp8y1bnsIfhVDshuR / SMSC8STJ9NHvdFvFVSil / +eIXei12OGMXOYaQ5fwQvJjECgYBcOYByBcKuI4WzeOBTQE5U9VM1j6ilOHYaUzeh84OCimq + 08Jb11q2O + QooCR / CqIDVW3Gqte1KfDGOvtHunjD805PwnCuEWe0KenRa7a / 74oyujWfc7IxbE3h6ez8k9nVckSbFtgwSyWxib + Tcwbf4UzVzs6xc47nb3drRCsc4QKBgH2ACNS0mCGAM9RQthI7fQGfesy02HmBJQ8hmpUgx6lWLTQn3kMquY3tV16jUhV8qOy978hEOr3kvcBagRqzkHPmXNBEp7x80ZgCfR4K6rJTOn8yn6FuExfN41LiwabNhnzZt5Ems2j6RMHRK4Loq40FSsqNJzRKiBjGyybroTCxAoGAKrKTuSmKX7yyRtyg31Vy5sBdOEWMZHVsToZ6C9DPc1qwp + NHjpR30CnniW2ALAF / LcIgvPLKdup58P9U1mVHVtY9D0pGHPs3ZXcLSsx8oJQ2HJ8GELg5bIBGNJOfVjQJonZp4vIoHJaiARFluYKuwjBYL0Z3IZWWU5yW5Y9sVtQ =';
//   try {
//     const token = await jwt.sign(payload, secret, options);
//     return token;
//   } catch (error) {
//     return console.log(error.message);
//   }
// };

// createToken().then((token) => console.log(token));
