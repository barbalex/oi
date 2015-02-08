/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    signIn        = require('./signIn'),
    signUp        = require('./signUp'),
    tellWithModal = require('../tellWithModal'),
    validateEmail = require('../validateEmail');

function validSignin(signindata) {
    var validName,
        validPassword,
        valid;

    validName     = signindata.name && validateEmail(signindata.name) ? true : false;
    validPassword = signindata.password                               ? true : false;
    valid         = validName && validPassword                        ? true : false;

    return valid;
}

function validSignup(signupdata) {
    // name and password were validated. check rest
    // TODO: now only password match. Add more later
    var passwordsMatch,
        valid;

    passwordsMatch = signupdata.password === signupdata.password2 ? true : false;
    valid          = passwordsMatch;

    return valid;
}

module.exports = function () {
    var signindata = {},
        signup     = $('#signinWithModalSignupCheckbox').is(':checked');

    signindata.name      = $('#signinWithModalEmail').val();
    signindata.password  = $('#signinWithModalPassword').val();
    signindata.password2 = $('#signinWithModalPassword2').val();
    signindata.remember  = $('#signinWithModalRemember').is(':checked');

    // Eingabe von Name und Passwort validieren
    if (!validSignin(signindata)) {
        tellWithModal('Anmeldung gescheitert', 'Bitte prüfen Sie Ihre Eingaben');
        return;
    }

    // signin oder signup?
    if (signup) {
        // Eigabe der Metadaten validieren
        if (!validSignup(signindata)) {
            tellWithModal('Anmeldung gescheitert', 'Bitte prüfen Sie Ihre Eingaben');
            return;
        }
        signUp(signindata);
        return;
    }
    signIn(signindata);
};