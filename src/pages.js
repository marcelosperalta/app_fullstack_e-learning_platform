const Database = require("./database/db")

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require("./utils/format")

//Funcionalidades

function pageLanding(req, res) {
    // return res.sendFile(__dirname + "/views/index.html");
    return res.render("index.html");
}

async function pageStudy(req, res) {
 // return res.sendFile(__dirname + "/views/study.html");
 // return res.render("study.html", { proffys: proffys, title: "Hi from Nunjucks" });
 // return res.render("study.html", { diego: proffys[0] });
 // console.log(req.query);
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })
    }
    // console.log("Nao tem campos vazios")

    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)


    const query = `    
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    // caso haja erro na hora da colsuta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }
    
}

function pageGiveClasses(req, res) {
    // return res.sendFile(__dirname + "/views/give-classes.html");
    // const data = req.query;
    // console.log(dados);

    // [name, avatar, bio...]
    // const isEmpty = Object.keys(data).length == 0
    // const isNotEmpty = Object.keys(data).length != 0
    // se tiver dados
    // const isNotEmpty = Object.keys(data).length > 0
    // if (isNotEmpty) {
    //     // console.log("Entrei aqui");

    //     data.subject = getSubject(data.subject)

    //     // adicionar dados a lista de proffys
    //     proffys.push(data);

    //     return res.redirect("/study")
    // }

    // // se nao, mostrar a pagina
    return res.render("give-classes.html", { subjects, weekdays });
}

async function saveClasses(req, res) {
    const createProffy = require("./database/createProffy")

    // const data = req.body
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        // queryString = queryString + ""
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}