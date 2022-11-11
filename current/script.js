/*https://mdn.github.io/dom-examples/web-crypto/encrypt-decrypt/index.html
const buffer = new ArrayBuffer(8, "utf8");
console.log(buffer.toString("utf8"));
console.log(buffer);*/

/*
Store the calculated _CIPHERTEXT here, so we can decrypt the message later.
*/
let _KEYPAIR,_CIPHERTEXT;
function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint8Array(buf));
};

/*
Export the given key and write it into the "exported-key" space.
*/
/*  const exportedAsString = ab2str(exported);
*   const exportedAsBase64 = window.btoa(exportedAsString);
*   const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
*   exportKeyOutput.textContent = pemExported;
*/
async function exportPublicKey(key) {
	return await window.crypto.subtle.exportKey("jwk", key );
}

async function exportPrivateKey(key) {
	return await crypto.subtle.exportKey("jwk", key )
}

/* Fetch the contents of the "message" textbox, and encode it in a form we can use for the encrypt operation. */
async function getMessageEncoding() {
	return await new TextEncoder().encode(document.querySelector("#rsa-oaep-message").value);
}

/*Get the encoded message, encrypt it and display a representation of the _CIPHERTEXT in the "Ciphertext" element.*/
/*name: "SHA-256"*/
async function encryptMessage(publicKey) {
	let encoded = await getMessageEncoding();
	_CIPHERTEXT = await window.crypto.subtle.encrypt({name: "RSA-OAEP"}, publicKey, encoded );
	document.querySelector(".rsa-oaep .ciphertext-value").textContent = `${new Uint8Array(_CIPHERTEXT, 0, _CIPHERTEXT.byteLength).slice(0,10)}...\n[${_CIPHERTEXT.byteLength} bytes total]`;
}

/* Fetch the _CIPHERTEXT and decrypt it. Write the decrypted message into the "Decrypted" box. */
async function decryptMessage(privateKey) {
	return await new TextDecoder().decode(await window.crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, _CIPHERTEXT ))
}

/* Generate an encryption key pair, then set up event listeners on the "Encrypt" and "Decrypt" buttons. */
/* Consider using a 4096-bit key for systems that require long-term security */
async function genKeyPair(){
	return await crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256"}, true, ["encrypt", "decrypt"] ) 
};

document.querySelector(".rsa-oaep .encrypt-button").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	await encryptMessage(_KEYPAIR.publicKey);
};

document.querySelector(".rsa-oaep .decrypt-button").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	if(!_CIPHERTEXT) {alert("encrypt sth,. before decrypt it.");return};
	let decryptedMessage = await decryptMessage(_KEYPAIR.privateKey);
	document.querySelector(".rsa-oaep .decrypted-value").textContent = decryptedMessage;
};

document.querySelector(".rsa-oaep .publicKey-export").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	let _exportedPublicKey = await exportPublicKey(_KEYPAIR.publicKey);
	document.querySelector(".exported-publicKey").textContent = JSON.stringify(_exportedPublicKey, null, " ");
};

document.querySelector(".rsa-oaep .privateKey-export").onclick = async() => {
	if(!_KEYPAIR) {alert("generateKey first of all.");return};
	let _exportedPrivateKey = await exportPrivateKey(_KEYPAIR.privateKey);
	document.querySelector(".exported-privateKey").textContent = JSON.stringify(_exportedPrivateKey, null, " ");
};

document.querySelector(".rsa-oaep .generateKey-button").onclick = async() => {
	if(_KEYPAIR) {if(!confirm("reGenerateKey..")){return}};
	_KEYPAIR = await genKeyPair();
	console.log(_KEYPAIR.publicKey.algorithm);
	console.log(_KEYPAIR.publicKey);
};

