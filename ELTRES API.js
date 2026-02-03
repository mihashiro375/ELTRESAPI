///core/otherapi.js
//EltresAPIなどをたたきます
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require("fs");
const path = require("path");
const ELTRESpass = (process.env.ELTRES_USER_PASS);
const ELTRESkey = (process.env.ELTRES_API_KEY);

async function New_ELTRES_Token(){
	const options = {
  		method: "POST",
  		headers: {
    		"X-API-Key": ELTRESkey,
    		"Content-Type": "application/json"
  		},
  		body: JSON.stringify({
    		username: process.env.ELTRES_USER_NAME,
    		password: ELTRESpass
  		})
	};
    const res = await fetch("https://api.clip-viewer-lite.com/auth/token", options);
    const data = await res.json();
	if(data.result !== "success") return null;
	const TOKEN = data.token;
	fs.writeFileSync("パスを入力", TOKEN);
	return "ok";
}

async function GET_ELTRES(eltresID, retried = false){
	let sendDateTime, gps, info;
	let TOKEN = fs.readFileSync("パスを入力","utf8").trim();
	const options = {
  		method: "GET",
  		headers: {
    		"X-API-Key": ELTRESkey,
    		"Authorization": TOKEN
  		}
	}
	const res = await fetch(`https://api.clip-viewer-lite.com/payload/latest/${eltresID}`, options);
    const data = await res.json();
	if(data.result === "success") {
		data.payload.forEach(item => {
			sendDateTime = item.sendDateTime;
			gps = item.gps;
		}); 
		info = retried ? "regenerated" : undefined;
		return {sendDateTime, gps, info};
	}
	if (data.result === "The incoming token has expired"){
		if (retried) {
			sendDateTime = null;
			gps = null;
			info = "Error:Token generator broken";
			return {sendDateTime, gps, info};
		}
		await New_ELTRES_Token();
		return await GET_ELTRES(eltresID, true);
	}
	sendDateTime = null;
	gps = null;
	info = "Error:APIerror" + data.result;
	return {sendDateTime, gps, info};
	
}

module.exports = { GET_ELTRES };
