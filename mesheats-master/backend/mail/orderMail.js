var nodemailer = require('nodemailer')

//FIXME: Fix this process.env.MAILD and PASSWORD
const ADMINID = process.env.MAILID || 'mesheats707@gmail.com';
const PASSWORD = process.env.PASSWORD || 'cusguscgohvxqfpc';

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: ADMINID,
        pass: PASSWORD
    },
    secure: true
})

exports.orderMail = (email, name, userMobile, messName, messEmail, totalBill, dishes) => {

    // const dishDetails = dishes.map(dish => {
    //     return (
    //         <div>
    //             <td colspan="2" style="padding-top: 48px; padding-bottom: 48px">
    //                 <table cellpadding="0" cellspacing="0" style="width: 100%">
    //                     <tbody>
    //                         <tr>
    //                             <td style="
    //                                                                 width: 100%;
    //                                                                 height: 1px;
    //                                                                 max-height: 1px;
    //                                                                 background-color: #e1e4eb;
    //                                                             ">
    //                                 {dish.description}
    //                             </td>
    //                             <td style="
    //                                                                 width: 100%;
    //                                                                 height: 1px;
    //                                                                 max-height: 1px;
    //                                                                 background-color: #e1e4eb;
    //                                                             ">
    //                                 {dish.rate}
    //                             </td>
    //                             <td style="
    //                                                                 width: 100%;
    //                                                                 height: 1px;
    //                                                                 max-height: 1px;
    //                                                                 background-color: #e1e4eb;
    //                                                             ">
    //                                 {dish.qty}
    //                             </td>
    //                             <td style="
    //                                                                 width: 100%;
    //                                                                 height: 1px;
    //                                                                 max-height: 1px;
    //                                                                 background-color: #e1e4eb;
    //                                                             ">
    //                                 {dish.rate * dish * qty}
    //                             </td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </td>
    //         </div>

    //     )
    // })

    const mailData = {
        from: `"Mesh Eats" <${ADMINID}>`,
        to: email,
        subject: 'Welcome to MeshEats Family',
        text: "We're Happy To serve You",
        html: `<!DOCTYPE html>
        <html lang="en">

            <head>
                <meta charset="UTF-8" />
                <title>Food Order Details</title>
                <title>Food Order Details : ${messName}</title>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <meta content="width=device-width" name="viewport" />
            
                <style media="screen and (max-width: 680px)">
                    @media screen and (max-width: 680px) {
                        .page-center {
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                        }
            
                        .footer-center {
                            padding-left: 20px !important;
                            padding-right: 20px !important;
                        }
                    }
                </style>
            </head>

            <body>
                <table cellpadding="0" cellspacing="0" style="
                                        width: 100%;
                                        height: 100%;
                                        background-color: #f4f4f5;
                                        text-align: center;
                                        ">
                    <tbody>
                        <tr>
                            <td style="text-align: center">
                                <table align="center" cellpadding="0" cellspacing="0" id="body" style="
                                                background-color: #fff;
                                                width: 100%;
                                                max-width: 680px;
                                                height: 100%;
                                                ">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table align="center" cellpadding="0" cellspacing="0" class="page-center" style="
                                                        text-align: left;
                                                        padding-bottom: 16px;
                                                        width: 100%;
                                                        padding-left: 103px;
                                                        padding-right: 103px;
                                                        ">
                                                    <tbody align="center">
                                                        <tr>
                                                            <td style="
                                                                padding-top: 24px;
                                                                display: flex;
                                                                justify-content: center;
                                                                align="center"
                                                            ">
                                                                <img src="cid:unique@cid" cid:unique@cid style="width: 100px; height: 100px" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2" style="
                                                                padding-top: 45px;
                                                                -ms-text-size-adjust: 100%;
                                                                -webkit-font-smoothing: antialiased;
                                                                -webkit-text-size-adjust: 100%;
                                                                color: #000000;
                                                                font-size: 35px; text-align: center; font-smoothing:
                                                                always; font-style: normal; font-weight: 600; letter-spacing:
                                                                -2.6px; line-height: 52px; mso-line-height-rule: exactly;
                                                                text-decoration: none;
                                                                /* font-family: " Postmates Std", "Helvetica" , -apple-system,
                                                                BlinkMacSystemFont, "Segoe UI" , "Roboto" , "Oxygen" , "Ubuntu"
                                                                , "Cantarell" , "Fira Sans" , "Droid Sans" , "Helvetica Neue" ,
                                                                sans-serif; */ "
                                                            >
                                                            Thank you for your order !
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <table
                                                        align=" center" cellpadding="0" cellspacing="0" style="width: 100%">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding-top: 24px; padding-bottom: 24px">
                                                                <img src="cid:take@cid" style="width: 65%; border-radius: 20px" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table align="center" cellpadding="0" cellspacing="0" class="page-center" style="
                                                        text-align: left;
                                                        padding-bottom: 72px;
                                                        width: 100%;
                                                        padding-left: 103px;
                                                        padding-right: 103px;
                                                        ">
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="2">
                                                                <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="
                                                                        padding-top: 24px;
                                                                        max-width: 100px;
                                                                        padding-right: 24px;
                                                                    ">
                                                                                <img src="https://f0.pngfuel.com/png/724/795/envelope-logo-png-clip-art.png"
                                                                                    style="
                                                                        max-width: 88px;
                                                                        border-radius: 44px;
                                                                        " />
                                                                            </td>
                                                                            <td style="
                                                                        padding-top: 24px;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-font-smoothing: antialiased;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        color: #000000;
                                                                        font-size: 18px; font-smoothing: always; font-style:
                                                                                normal; font-weight: 400; letter-spacing: -0.48px;
                                                                                line-height: 32px; mso-line-height-rule: exactly;
                                                                                text-decoration: none; vertical-align: middle;
                                                                                width: 100%;
                                                                        font-family: " Postmates Std", "Helvetica" , -apple-system,
                                                                                BlinkMacSystemFont, "Segoe UI" , "Roboto" , "Oxygen"
                                                                                , "Ubuntu" , "Cantarell" , "Fira Sans"
                                                                                , "Droid Sans" , "Helvetica Neue" , sans-serif; "
                                                                    >
                                                                    <span style=" font-weight: 600;">Dear ${name}</span>
                                                                                please take delivery of your food order from
                                                                                ${messName} MESS. YOUR ORDER WILL BE DELIVERED WITHIN 30
                                                                                MINUTES
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table cellpadding="0" cellspacing="0" style="
                                                                font-size: 14px;
                                                                margin: 0px auto;
                                                                border-collapse: collapse;
                                                                margin-top: 50px;
                                                                " width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="left" style="
                                                                font-weight: 600;
                                                                margin: 0;
                                                                vertical-align: top;
                                                                padding-left: 20px;
                                                                border-top-left-radius: 10px;
                                                                border-bottom-left-radius: 10px;
                                                                border: 0px solid;
                                                                "> Dish Details </td>
                                                                            <td align="left" style="
                                                                font-weight: 600;
                                                                margin: 0;
                                                                vertical-align: top;
                                                                padding-left: 20px;
                                                                border-top-left-radius: 10px;
                                                                border-bottom-left-radius: 10px;
                                                                border: 0px solid;
                                                                "> Price </td>
                                                                            <td align="left" style="
                                                                font-weight: 600;
                                                                margin: 0;
                                                                vertical-align: top;
                                                                padding-left: 20px;
                                                                border-top-left-radius: 10px;
                                                                border-bottom-left-radius: 10px;
                                                                border: 0px solid;
                                                                "> Quantity </td>
                                                                            <td align="left" style="
                                                                font-weight: 600;
                                                                margin: 0;
                                                                vertical-align: top;
                                                                padding-left: 20px;
                                                                border-top-left-radius: 10px;
                                                                border-bottom-left-radius: 10px;
                                                                border: 0px solid;
                                                                ">Total Price </td>
                                                                        </tr>
                                                                        <tr style="
                                                                        margin: 0;
                                                                        border-radius: 20px;
                                                                        border: 0px solid rgba(0, 0, 0, 0.212);
                                                                        height: 20px;
                                                                        width: 100%;
                                                                        background-color: #fde1ff;
                                                                    ">
                                                                            <td align="left" style="
                                                                        font-weight: 600;
                                                                        margin: 0;
                                                                        vertical-align: top;
                                                                        padding-left: 20px;
                                                                        border-top-left-radius: 10px;
                                                                        border-bottom-left-radius: 10px;
                                                                        border: 0px solid;
                                                                    ">
                                                                            </td>
                                                                            <td align="center"
                                                                                style="margin: 0; vertical-align: top">
                                                                            </td>
                                                                            <td align="center"
                                                                                style="margin: 0; vertical-align: top">
                                                                            </td>
                                                                            <td align="right" style="
                                                                        margin: 0;
                                                                        vertical-align: top;
                                                                        border-top-right-radius: 10px;
                                                                        padding-right: 20px;
                                                                        border-bottom-right-radius: 10px;
                                                                        "> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td colspan="2" style="
                                                                -ms-text-size-adjust: 100%;
                                                                -webkit-font-smoothing: antialiased;
                                                                -webkit-text-size-adjust: 100%;
                                                                color: #000000;
                                                                font-size: 30px; text-align:center; font-smoothing:
                                                                always; font-style: normal; font-weight: 500; letter-spacing:
                                                                -0.78px; line-height: 40px; mso-line-height-rule: exactly;
                                                                text-decoration: none;
                                                                font-family: " Postmates Std", "Helvetica" , -apple-system,
                                                                BlinkMacSystemFont, "Segoe UI" , "Roboto" , "Oxygen" , "Ubuntu"
                                                                , "Cantarell" , "Fira Sans" , "Droid Sans" , "Helvetica Neue" ,
                                                                sans-serif; "
                                                            >
                                                            Total Payable Bill : ₹ ${totalBill}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                            colspan=" 2" style="padding-top: 48px; padding-bottom: 48px">
                                                                <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="
                                                                        width: 100%;
                                                                        height: 1px;
                                                                        max-height: 1px;
                                                                        background-color: #e1e4eb;
                                                                    "></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 25px">
                                                                                <img src="https://d1pgqke3goo8l6.cloudfront.net/5ehc9vX9QQOff6gVsgah_start.png"
                                                                                    style="
                                                                        max-width: 16px;
                                                                        padding-top: 3px;
                                                                        vertical-align: top;
                                                                        " />
                                                                            </td>
                                                                            <td style="
                                                                        -ms-text-size-adjust: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-font-smoothing: antialiased;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        color: #9095a2;
                                                                        font-size: 16px; font-smoothing: always; font-style:
                                                                                normal; font-weight: 400; letter-spacing: -0.24px;
                                                                                line-height: 24px; mso-line-height-rule: exactly;
                                                                                text-decoration: none; vertical-align: top; width:
                                                                                100%; min-width: 225px;
                                                                        font-family:  Postmates Std, Helvetica , -apple-system,
                                                                                BlinkMacSystemFont, Segoe UI , Roboto, Oxygen
                                                                                , Ubuntu , Cantarell , Fira Sans
                                                                                , Droid Sans , Helvetica Neue , sans-serif; "></td>
                                                                            <span style=" font-weight: 600; color: #000000">
                                                                                ${name}, ${email} ${userMobile}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="
                                                                        padding-top: 10px;
                                                                        vertical-align: top;
                                                                    ">
                                                                <a href="https://maps.app.goo.gl/utNeRhF8oLHwJB9F7" target="_blank">
                                                                    <img src="https://d1pgqke3goo8l6.cloudfront.net/KYzSiQPnSgSDHn2bv34U_Pin.png"
                                                                        style="max-width: 16px" />
                                                                </a>
                                                            </td>
                                                            <td style="
                                                                        -ms-text-size-adjust: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-font-smoothing: antialiased;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        color: #9095a2;
                                                                        font-size: 16px; font-smoothing: always; font-style:
                                                                                normal; font-weight: 400; letter-spacing: -0.24px;
                                                                                line-height: 24px; mso-line-height-rule: exactly;
                                                                                text-decoration: none; vertical-align: top; width:
                                                                                100%; padding-top: 8px; min-width: 225px;
                                                                        font-family: " Postmates Std", "Helvetica" , -apple-system,
                                                                BlinkMacSystemFont, "Segoe UI" , "Roboto" , "Oxygen" , "Ubuntu"
                                                                , "Cantarell" , "Fira Sans" , "Droid Sans" , Helvetica Neue ,
                                                                sans-serif";>
                                                                <span style=" font-weight: 600; color: #000000">
                                                                    ${messEmail} , ${messName}
                                                                    <br />

                                                                    <br />
                                                                    <a href="mailto:${messEmail}"
                                                                        target="_blank"><span
                                                                            style="font-weight: 500; color: #9095a2; text-decoration: none;">${messEmail}
                                                                        
                                                                        </span></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <table align="center" cellpadding="0" cellspacing="0" id="footer" style="
                                                background-color: #b13476;
                                                width: 100%;
                                                max-width: 680px;
                                                height: 100%;
                                                ">
                    <tbody>
                        <tr>
                            <td>
                                <table align="center" cellpadding="0" cellspacing="0" class="footer-center" style="
                                                        text-align: left;
                                                        width: 100%;
                                                        padding-left: 103px;
                                                        padding-right: 103px;
                                                        ">
                                    <tbody>
                                        <tr>
                                            <td colspan="2" style="
                                                                padding-top: 72px;
                                                                padding-bottom: 24px;
                                                                width: 100%;
                                                            ">
                                                <span style="
                                                                color: white;
                                                                font-size: 26px;
                                                                font-weight: 900;
                                                                ">${messName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="padding-top: 24px; padding-bottom: 48px">
                                                <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                    <tbody>
                                                        <tr>
                                                            <td style="
                                                                        width: 100%;
                                                                        height: 1px;
                                                                        max-height: 1px;
                                                                        background-color: #eaecf2;
                                                                        opacity: 0.19;
                                                                    "></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="
                                                                -ms-text-size-adjust: 100%;
                                                                -ms-text-size-adjust: 100%;
                                                                -webkit-font-smoothing: antialiased;
                                                                -webkit-text-size-adjust: 100%;
                                                                color: #e1e1e1;
                                                                font-size: 16px; font-smoothing: always; font-style:
                                                                normal; font-weight: 400; letter-spacing: 0; line-height: 24px;
                                                                mso-line-height-rule: exactly; text-decoration: none;
                                                                vertical-align: top; width: 100%;   
                                                                font-family: " Postmates Std", "Helvetica" , -apple-system,
                                                BlinkMacSystemFont, "Segoe UI" , "Roboto" , "Oxygen" , "Ubuntu" , "Cantarell"
                                                , "Fira Sans" , "Droid Sans" , "Helvetica Neue" , sans-serif; "
                                                            >
                                                            If you have any questions or concerns, we are here
                                                            to help.
                                                            <a
                                                                data-click-track-id=" 7157" href="mailto:mesheats707@gmail.com"
                                                style="font-weight: 600; color: #fff" target="_blank">Contact Us
                                                Now</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height: 72px"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
            </body>

        </html>`,
        attachments: [{
            filename: 'logo.jpg',
            path: './mail/logo.jpg',
            cid: 'unique@cid'
        },
        {
            filename: 'takeaway.jpg',
            path: './mail/takeaway.jpg',
            cid: 'take@cid'
        }]

    }

    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log("Mail Sent");
    })
}
