const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        auth:{
            user:'franciscoberthet@gmail.com',
            pass:'ueheykcclefzdtlf'
        }
    }
)

function main(){
    transporter.sendMail({
        from:'Foo from @bar.com <donotreply@bar.com>' ,
        to:'franciscoberthet@gmail.com',
        subject:'test',
        html:'<h1>this is a test</h1>'
    }).then(console.info).catch(console.catch)
}

main()