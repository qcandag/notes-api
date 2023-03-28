import bcrypt from 'bcrypt'

const users = []
export const loginView = (req, res) => {
    res.render('login.ejs')
}
export const register = (req, res) => {
    res.render('register.ejs')
}
export const store = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/auth/login')
    } catch (error) {
        res.redirect('/auth/register')
    }
}

export const findUserByEmail = (email) => {
    const user  = users.find(user => user.email === email)
    return user
}
export const findUserById = (id) => {
    const user  = users.find(user => user.id === id)
    return user
}