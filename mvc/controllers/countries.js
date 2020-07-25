const request = require("request");


const domainPath = "http://localhost:3000";

getCountryList = function(req, res, next) {
    const path = "/api/countries";
    const requestOptions = {
        url: `${domainPath}${path}`,
        method: "GET"
    }

    request(requestOptions , (err, response , body) => {
        if(err) { return res.json({error: err}); }

        let countries = JSON.parse(body).country;
        if(response.statusCode === 200){
            return res.render("countries" , {title : "List of Countries" , countries : countries});
            // res.json({countries : countries});
        }
        res.json({message : "Something went wrong"});
    });
}

getCountry = function({params}, res, next) {
    const path = `/api/countries/${params.countryid}`;
    const requestOptions = {
        url: `${domainPath}${path}`,
        method: "GET"
    }

    request(requestOptions , (err, response , body) => {
        if(err) { return res.json({error: err}); }

        body = JSON.parse(body);
        if(body.error) { return res.json({error : body.error}); }

        if(response.statusCode === 200){
            return res.render("country" , {title : "Country Interface" , country : body.country});
            // res.json({countries : countries});
        }
        res.json({message : "Something went wrong"});
    });
}

createCountry = function({body}, res, next) {
    const path = `/api/countries/`;
    const requestOptions = {
        url: `${domainPath}${path}`,
        method: "POST",
        json: { name : body.name }
    }

    request(requestOptions , (err, response , body) => {
        if(err) { return res.json({error: err}); }

        if(response.statusCode === 400){ return res.json(body); }

        if(response.statusCode === 201){
            return res.redirect("/countries");
        }
        else
            res.json({message : "Something went wrong"});
    });
}

editCountry = function({params , body}, res, next) {
    const path = `/api/countries/${params.countryid}`;
    const requestOptions = {
        url: `${domainPath}${path}`,
        method: "PUT",
        json: {name : body.name}
    }

    request(requestOptions , (err, response , body) => {
        if(err) { return res.json({error: err}); }

        if(response.statusCode === 400){ return res.json(body); }

        if(response.statusCode === 201){
            return res.redirect("/countries");
        }
        else
            res.json({message : "Something went wrong"});
    });
}

deleteCountry = function({params}, res, next) {
    const path = `/api/countries/${params.countryid}`;
    const requestOptions = {
        url: `${domainPath}${path}`,
        method: "DELETE",
    }

    request(requestOptions , (err, response , body) => {
        if(err) { return res.json({error: err}); }

        if(response.statusCode === 404){ return res.json(body); }

        if(response.statusCode === 204){
            return res.redirect("/countries");
        }
        else
            res.json({message : "Something went wrong"});
    });
}

module.exports = {
    getCountryList,
    getCountry,
    createCountry,
    editCountry,
    deleteCountry
}