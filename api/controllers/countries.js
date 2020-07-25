const mongoose = require("mongoose");
const Country = mongoose.model("Country");

let countryData = require("../../country-data");

getCountries = function(req, res, next) {
    Country.find((err , countries) => {
        if(err){ return res.json({ error : err}); }

        res.statusJson(200, { 
            message: "Get All Countries",
            country: countries
        });
    });
}

getCountryForm = function(req, res, next) {
    res.render("form" , {title : "Create A Country"});
}

createCountry = function({body}, res, next) {
    if(!body.name) { return res.statusJson(400 , {message : "Missing name for the country."}); }

    Country.find({} , null , {sort: {fakeid : 1}} , (err , countries) =>{

        if(err) { return res.send({error : err}); }

        for(let i=0;i<countries.length;i++) {
            if(countries[i].fakeid != i+1) {
                var newId = i + 1;
                break;
            }
        }

        country = { 
            name : body.name,
            fakeid: newId || countries.length + 1
        };
        Country.create(country , (err , newCountry) => {
            if(err){ return res.json({ error : err}); }
    
           
            res.statusJson(201, { 
                message: "Create New Country",
                newCountry : newCountry    
            }); 
        });
    });

}

getCountry = function({params}, res, next) {
    Country.findOne({fakeid : params.countryid} , (err , country) => {
        if(err){ return res.json({ error : err}); }

        res.statusJson(200, { 
            message: "Get Specific Country",
            country: country
        });
    });
}

getEditCountryForm = function({params}, res, next) {
    Country.findById(params.countryid , (err , country) => {
        if(err){ return res.json({ error : err}); }

        res.render("form" , {title : "Edit A Country" , country : country});
    });
}

editCountry = function({body,params}, res, next) {
    if(!body.name) { return res.statusJson(400 , "Missing name for Country."); }

    Country.findById(params.countryid , (err , country) => {
        if(err){ return res.json({ error : err}); }

        if(!country) { return statusJson(400 , {message : "Could not find Country."}); }

        country.name = body.name;
        country.save((err , updatedCountry) => {
            res.statusJson(201 , {
                message: "Edit Specific Country",
                updatedCountry: updatedCountry
            })
        });
    });
    // res.statusJson(201, { message: "Edit Specific Country" });
}

deleteCountry = function({params}, res, next) {

    Country.findByIdAndRemove(params.countryid , (err , country) => {
        if(err){ return res.json({ error : err}); }
        if(!country){ return res.statusJson(404,  {message : "Could not find Country. "}); }

        res.statusJson(204, { 
            message: "Delete Specific Country",
            country: country
        });
    });
}

reset = function(req,res){
    Country.deleteMany({} , (err , info) => {
        if(err){ return res.json({ error : err}); }

        Country.insertMany(countryData , (err , info) => {
            res.redirect("/countries");
        });
    });
}



module.exports = {
    getCountries,
    getCountryForm,
    createCountry,
    getCountry,
    getEditCountryForm,
    editCountry,
    deleteCountry,
    reset
}