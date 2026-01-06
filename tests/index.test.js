const axios = require('axios');
const BACKEND_URL = "http://localhost:8080";
// describe('Authentication',   () => {
//     test('User should be able to signup only once',async ()=>{
//         const username = "aryan" + Math.random();
//         const password = "123456";
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type:"admin"
//         })

//         expect(response.statusCode).toBe(200);
//          const updatedresponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type:"admin"
//         })
//         expect(response.statusCode).toBe(400);
//     })

//     test('Signup request should fail if username is empty',async ()=>{ 
//         const password = "123456";
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             password
//         })

//         expect(response.statusCode).toBe(400);
//     })

//     test('Signin succeeds if the username and password are correct',async ()=>{
//         const username = "aryan";
//         const password = "123456";
//         await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password
//         })
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password    
//         })
//         expect(response.statusCode).toBe(200);
//         expect(response.body.token).toBeDefined();
//     })

//     test('Signin should fails if username and passwords are incorrect',async ()=>{
//         const username = "aryan" + Math.random();
//         const password = "123456";
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password    
//         })
//         expect(response.statusCode).toBe(403);
//     })
// })

describe('User information page',()=>{
    beforeAll(()=>{
        console.log("Before all");
    })

    test('test1',()=>{
        expect(1).toBe(1);
    })
})