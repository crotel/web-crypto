/*https://mdn.github.io/dom-examples/web-crypto/encrypt-decrypt/index.html
const buffer = new ArrayBuffer(8, "utf8");
console.log(buffer.toString("utf8"));
console.log(buffer);*/

/*
Store the calculated _CIPHERTEXT here, so we can decrypt the message later.
*/
let _KEYPAIR,_CIPHERTEXT;
async function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint8Array(buf));
};
async function str2ab(str) {
	const buf = new ArrayBuffer(str.length);
	const bufView = new Uint8Array(buf);
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
};
/*
Export the given key and write it into the "exported-key" space.
*/
/*  const exportedAsString = ab2str(exported);
*   const exportedAsBase64 = window.btoa(exportedAsString);
*   const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
*   exportKeyOutput.textContent = pemExported;
*/
async function jwkKey(key){
	return JSON.stringify(await crypto.subtle.exportKey("jwk", key),null,2)
}

async function pemPublicKey(key) {
	// return await window.crypto.subtle.exportKey("jwt", key );
	let exported = await crypto.subtle.exportKey("spki", key );
	const exportedAsString = await ab2str(exported);
	const exportedAsBase64 = btoa(exportedAsString);
	const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
	return pemExported
}

async function pemPrivateKey(key) {
	// return await crypto.subtle.exportKey("jwt", key )
	let exported = await crypto.subtle.exportKey("pkcs8", key );
	const exportedAsString = await ab2str(exported);
	const exportedAsBase64 = btoa(exportedAsString);
	const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
	return pemExported
}

/* Fetch the contents of the "message" textbox, and encode it in a form we can use for the encrypt operation. */
// async function getMessageEncoding() {
// 	return await new TextEncoder().encode(document.querySelector("#rsa-oaep-message").value);
// }

/*Get the encoded message, encrypt it and display a representation of the _CIPHERTEXT in the "Ciphertext" element.*/
/*name: "SHA-256"*/
async function pemEncrypt(pem, msg) {
	// let encoded = await getMessageEncoding();
	// _CIPHERTEXT = 
	const pemHeader = "-----BEGIN PRIVATE KEY-----";
	const pemFooter = "-----END PRIVATE KEY-----";
	const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    // base64 decode the string to get the binary data
	const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
	const binaryDer = await str2ab(binaryDerString);

	let publicKey = await window.crypto.subtle.importKey(
		"spki",
		binaryDer,
		{
			name: "RSA-OAEP",
			hash: {
				name: "SHA-256",
			},
		},
		false,
		["encrypt"]
		);
	return await crypto.subtle.encrypt({name: "RSA-OAEP"}, publicKey, msg );
	// return await crypto.subtle.encrypt({name: "RSA-OAEP"}, publicKey, await getMessageEncoding() );
	// document.querySelector(".rsa-oaep .ciphertext-value").textContent = `${new Uint8Array(_CIPHERTEXT, 0, _CIPHERTEXT.byteLength).slice(0,10)}...\n[${_CIPHERTEXT.byteLength} bytes total]`;
}

/* Fetch the _CIPHERTEXT and decrypt it. Write the decrypted message into the "Decrypted" box. */
async function pemDecrypt(pem,ab) {
	console.log(pem,ab);
	const pemHeader = "-----BEGIN PRIVATE KEY-----";
	const pemFooter = "-----END PRIVATE KEY-----";
	const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    // base64 decode the string to get the binary data
	const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
	const binaryDer = await str2ab(binaryDerString);

	let privateKey = await window.crypto.subtle.importKey(
		"pkcs8",
		binaryDer,
		{
			name: "RSA-OAEP",
			hash: {
				name: "SHA-256",
			},
		},
		false,
		["decrypt"]
		);
// let privateKey = await window.crypto.subtle.importKey(
// 		"spki",
// 		binaryDer,
// 		{
// 			name: "RSA-OAEP",
// 			hash: {
// 				name: "SHA-256",
// 			},
// 		},
// 		false,
// 		["encrypt"]
// 		);
	// return await crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, ab.buffer )
	return await new TextDecoder().decode(await crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, ab.buffer ))
	// return await new TextDecoder().decode(await crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, _CIPHERTEXT ))
}

async function jwkEncrypt(jwk, msg) {
	// let encoded = await getMessageEncoding();
	// _CIPHERTEXT = 
	// const pemHeader = "-----BEGIN PRIVATE KEY-----";
	// const pemFooter = "-----END PRIVATE KEY-----";
	// const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
  //   // base64 decode the string to get the binary data
	// const binaryDerString = window.atob(pemContents);
  //   // convert from a binary string to an ArrayBuffer
	// const binaryDer = await str2ab(binaryDerString);

	let publicKey = await window.crypto.subtle.importKey(
		"jwk",
		JSON.parse(jwk),
		{
			name: "RSA-OAEP",
			hash: {
				name: "SHA-256",
			},
		},
		false,
		["encrypt"]
		);
	return await crypto.subtle.encrypt({name: "RSA-OAEP"}, publicKey, msg );
	// return await crypto.subtle.encrypt({name: "RSA-OAEP"}, publicKey, await getMessageEncoding() );
	// document.querySelector(".rsa-oaep .ciphertext-value").textContent = `${new Uint8Array(_CIPHERTEXT, 0, _CIPHERTEXT.byteLength).slice(0,10)}...\n[${_CIPHERTEXT.byteLength} bytes total]`;
}

/* Fetch the _CIPHERTEXT and decrypt it. Write the decrypted message into the "Decrypted" box. */
async function jwkDecrypt(jwk,ab) {
	// console.log(pem,ab);
	// const pemHeader = "-----BEGIN PRIVATE KEY-----";
	// const pemFooter = "-----END PRIVATE KEY-----";
	// const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
  //   // base64 decode the string to get the binary data
	// const binaryDerString = window.atob(pemContents);
  //   // convert from a binary string to an ArrayBuffer
	// const binaryDer = await str2ab(binaryDerString);

	let privateKey = await window.crypto.subtle.importKey(
		"jwk",
		JSON.parse(jwk),
		{
			name: "RSA-OAEP",
			hash: {
				name: "SHA-256",
			},
		},
		false,
		["decrypt"]
		);
// let privateKey = await window.crypto.subtle.importKey(
// 		"spki",
// 		binaryDer,
// 		{
// 			name: "RSA-OAEP",
// 			hash: {
// 				name: "SHA-256",
// 			},
// 		},
// 		false,
// 		["encrypt"]
// 		);
	// return await crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, ab.buffer )
	return await new TextDecoder().decode(await crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, ab.buffer ))
	// return await new TextDecoder().decode(await crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, _CIPHERTEXT ))
}

/* Generate an encryption key pair, then set up event listeners on the "Encrypt" and "Decrypt" buttons. */
/* Consider using a 4096-bit key for systems that require long-term security */
async function genKeyPair(){
	return await crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256"}, true, ["encrypt", "decrypt"] ) 
};

document.querySelector(".rsa-oaep .encrypt-button.pem").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	// _CIPHERTEXT = await encryptMessage(_KEYPAIR.publicKey);
	_CIPHERTEXT = await pemEncrypt(document.querySelector(".exported-publicKey").textContent,(await new TextEncoder().encode(document.querySelector("#rsa-oaep-message").value)));
	document.querySelector(".rsa-oaep .ciphertext-full").textContent = new Uint8Array(_CIPHERTEXT, 0, _CIPHERTEXT.byteLength);//await new TextEncoder().encode(_CIPHERTEXT);//new Uint8Array(_CIPHERTEXT);
	document.querySelector(".rsa-oaep .ciphertext-value").textContent = `${new Uint8Array(_CIPHERTEXT, 0, _CIPHERTEXT.byteLength).slice(0,10)}...\n[${_CIPHERTEXT.byteLength} bytes total]`;
};

document.querySelector(".rsa-oaep .decrypt-button.pem").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	if(!_CIPHERTEXT) {alert("encrypt sth,. before decrypt it.");return};
	// let decryptedMessage = await decryptMessage(_KEYPAIR.privateKey);

	let decryptedMessage = await pemDecrypt(document.querySelector(".exported-privateKey").textContent,await Uint8Array.from((document.querySelector(".rsa-oaep .ciphertext-full").innerText).split(",")));
	console.log(decryptedMessage);
	document.querySelector(".rsa-oaep .decrypted-value").textContent = decryptedMessage;
};

document.querySelector(".rsa-oaep .encrypt-button.jwk").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	// _CIPHERTEXT = await encryptMessage(_KEYPAIR.publicKey);
	_CIPHERTEXT = await jwkEncrypt(document.querySelector(".exported-publicKey").textContent,(await new TextEncoder().encode(document.querySelector("#rsa-oaep-message").value)));
	document.querySelector(".rsa-oaep .ciphertext-full").textContent = new Uint8Array(_CIPHERTEXT, 0, _CIPHERTEXT.byteLength);//await new TextEncoder().encode(_CIPHERTEXT);//new Uint8Array(_CIPHERTEXT);
	document.querySelector(".rsa-oaep .ciphertext-value").textContent = `${new Uint8Array(_CIPHERTEXT, 0, _CIPHERTEXT.byteLength).slice(0,10)}...\n[${_CIPHERTEXT.byteLength} bytes total]`;
};

document.querySelector(".rsa-oaep .decrypt-button.jwk").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	if(!_CIPHERTEXT) {alert("encrypt sth,. before decrypt it.");return};
	// let decryptedMessage = await decryptMessage(_KEYPAIR.privateKey);

	let decryptedMessage = await jwkDecrypt(document.querySelector(".exported-privateKey").textContent,await Uint8Array.from((document.querySelector(".rsa-oaep .ciphertext-full").innerText).split(",")));
	console.log(decryptedMessage);
	document.querySelector(".rsa-oaep .decrypted-value").textContent = decryptedMessage;
};

// document.querySelector(".rsa-oaep .publicKey-export").onclick = async() => {
// 	if(!_KEYPAIR) {alert("generateKey first of all.");return};
// 	let _exportedPublicKey = await exportPublicKey(_KEYPAIR.publicKey);
// 	// document.querySelector(".exported-publicKey").textContent = JSON.stringify(_exportedPublicKey, null, " ");
// 	document.querySelector(".exported-publicKey").textContent = _exportedPublicKey;
// };

// document.querySelector(".rsa-oaep .privateKey-export").onclick = async() => {
// 	if(!_KEYPAIR) {alert("generateKey first of all.");return};
// 	let _exportedPrivateKey = await exportPrivateKey(_KEYPAIR.privateKey);
// 	console.log(_exportedPrivateKey)
// 	// document.querySelector(".exported-privateKey").textContent = JSON.stringify(_exportedPrivateKey, null, " ");
// 	document.querySelector(".exported-privateKey").textContent = _exportedPrivateKey;
// };

document.querySelector(".rsa-oaep .generateKey-button.pem").onclick = async() => {
	if(_KEYPAIR) {if(!confirm("reGenerateKey..")){document.querySelector(".rsa-oaep .generateKey-button.jwk").style.color = "";return}};
	_KEYPAIR = await genKeyPair();
	// console.log(_KEYPAIR);
	document.querySelector(".rsa-oaep .generateKey-button.pem").style.color = "green";
	document.querySelector(".exported-publicKey").textContent = await pemPublicKey(_KEYPAIR.publicKey);
	await document.querySelector(".rsa-oaep .encrypt-button.pem").removeAttribute("disabled");
	document.querySelector(".exported-privateKey").textContent = await pemPrivateKey(_KEYPAIR.privateKey);
	await document.querySelector(".rsa-oaep .decrypt-button.pem").removeAttribute("disabled");
	// setTimeout()
	// if(_KEYPAIR)
	// console.log(_KEYPAIR.publicKey.algorithm);
	// console.log(_KEYPAIR.publicKey);
};
document.querySelector(".rsa-oaep .generateKey-button.jwk").onclick = async() => {
	if(_KEYPAIR) {if(!confirm("reGenerateKey..")){document.querySelector(".rsa-oaep .generateKey-button.pem").style.color = "";return}};
	_KEYPAIR = await genKeyPair();
	// console.log(_KEYPAIR);
	document.querySelector(".rsa-oaep .generateKey-button.jwk").style.color = "green";
	document.querySelector(".exported-publicKey").textContent = await jwkKey(_KEYPAIR.publicKey);
	await document.querySelector(".rsa-oaep .encrypt-button.jwk").removeAttribute("disabled");
	document.querySelector(".exported-privateKey").textContent = await jwkKey(_KEYPAIR.privateKey);
	await document.querySelector(".rsa-oaep .decrypt-button.jwk").removeAttribute("disabled");
	// if(_KEYPAIR)
	// console.log(_KEYPAIR.publicKey.algorithm);
	// console.log(_KEYPAIR.publicKey);
};
