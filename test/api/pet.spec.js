// Bibliotecas e Frameworks
const supertest = require('supertest')
const request = supertest('https://petstore.swagger.io/v2')

// Massa de dados
const massa1 = require('../../vendors/json/massaUser')
const massa2 = require('../../vendors/json/massaUserPut')

describe('petStore Swagger - Entidade User', () => {

    massa1.array.forEach(({ id, username, firstName, lastName, email, password, phone, userStatus }) => {


        it(`Post User Data Driven ForEach - ${id}`, () => {
            const user = require('../../vendors/json/massaUser')

            // Atualizando os dados do usuário com os valores da massa
            user.id = id,
            user.username = username,
            user.firstName = firstName,
            user.lastName = lastName,
            user.email = email,
            user.password = password,
            user.phone = phone,
            user.userStatus = userStatus

            return request
                .post('/user')
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toBe(200),
                    expect(res.body.code).toBe(200),
                    expect(res.body.type).toBe('unknown'),
                    expect(res.body.message).toBe(String(id))
                })
        }) // Termina o POST

        
        // Atualizar Usuário
        it(`Put User Data Driven ForEach - ${id}`, () => {
            const user = require('../../vendors/json/massaUserPut')

            massa2.array.forEach(({ id}) => {
                
            user.id = id

            return request
                .put(`/user/${id}`)
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toBe(200),
                    expect(res.body.type).toBe('unknown'),
                    expect(res.body.message).toBe(String(id))
                })

            }) // Termina ForEach/massa2

        }) // Termina o PUT

        //Procurar Usuário 
        it(`Get User Data Driven ForEach - ${username}`, () => {
            const user = require('../../vendors/json/massaUser')

            return request
                .get(`/user/${username}`)
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toBe(200),
                    expect(res.body.id).toBe(id),
                    expect(res.body.username).toBe(username),
                    expect(res.body.firstName).toBe(firstName),
                    expect(res.body.lastName).toBe(lastName),
                    expect(res.body.email).toBe(email),
                    expect(res.body.password).toBe(password),
                    expect(res.body.phone).toBe(String(phone)),
                    expect(res.body.userStatus).toBe(userStatus)
                })

        }) //Termina o GET




        it(`Delete User Data Driven ForEach -${username}`, () => {
            const user = require('../../vendors/json/massaUser')
            user.name = username

            return request
                .delete(`/user/${username}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200),
                    expect(res.body.code).toBe(200),
                    expect(res.body.type).toBe('unknown'),
                    expect(res.body.message).toBe(username)

                }) 

        }) // Termina DELETE

    }) // Termina o forEach/massa1

}) // Termina o Describe