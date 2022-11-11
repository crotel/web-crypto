// https://mdn.github.io/dom-examples/web-crypto/encrypt-decrypt/index.html
// const buffer = new ArrayBuffer(8, "utf8");
// // console.log(buffer.toString("utf8"));
// console.log(buffer);
(() => {
	/*
  Store the calculated ciphertext here, so we can decrypt the message later.
  */
	let ciphertext;
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  };

  /*
  Export the given key and write it into the "exported-key" space.
  */
  async function exportPublicKey(key) {
    const exported = await window.crypto.subtle.exportKey(
      "jwk",
      key
    );
//     const exportedAsString = ab2str(exported);
//     const exportedAsBase64 = window.btoa(exportedAsString);
//     const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;

    const exportKeyOutput = document.querySelector(".exported-publicKey");
	exportKeyOutput.textContent = JSON.stringify(exported, null, " ");
    // exportKeyOutput.classList.add("fade-in");
//     exportKeyOutput.addEventListener("animationend", () => {
//       exportKeyOutput.classList.remove("fade-in");
//     });
//     exportKeyOutput.textContent = pemExported;
  }
  
  async function exportPrivateKey(key) {
    const exported = await window.crypto.subtle.exportKey(
      "jwk",
      key
    );
    const exportKeyOutput = document.querySelector(".exported-privateKey");
    // exportKeyOutput.classList.add("fade-in");
//     exportKeyOutput.addEventListener("animationend", () => {
//       exportKeyOutput.classList.remove("fade-in");
//     });
    exportKeyOutput.textContent = JSON.stringify(exported, null, " ");
  }
	/*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for the encrypt operation.
  */
	function getMessageEncoding() {
		const messageBox = document.querySelector("#rsa-oaep-message");
		let message = messageBox.value;
		let enc = new TextEncoder();
// 		console.log(enc.encode(message)); // the ciphertext
		return enc.encode(message);
	}

	/*
  Get the encoded message, encrypt it and display a representation
  of the ciphertext in the "Ciphertext" element.
  */
	async function encryptMessage(publicKey) {
		let encoded = getMessageEncoding();
// 		console.log(encoded)
		ciphertext = await window.crypto.subtle.encrypt(
			{
				name: "RSA-OAEP"
				// name: "SHA-256"
			},
			publicKey,
			encoded
		);

		let buffer = new Uint8Array(ciphertext, 0, ciphertext.byteLength);
		const ciphertextValue = document.querySelector(".rsa-oaep .ciphertext-value");
		// ciphertextValue.classList.add("fade-in");
// 		ciphertextValue.addEventListener("animationend", () => {
// 			ciphertextValue.classList.remove("fade-in");
// 		});
		console.log(buffer.toString());
		console.log(ciphertext);
		ciphertextValue.textContent = `${buffer}\n[${ciphertext.byteLength} bytes total]`;
	}

	/*
  Fetch the ciphertext and decrypt it.
  Write the decrypted message into the "Decrypted" box.
  */
	async function decryptMessage(privateKey) {
		let decrypted = await window.crypto.subtle.decrypt(
			{
				name: "RSA-OAEP"
			},
			privateKey,
			ciphertext
		);

		let dec = new TextDecoder();
		const decryptedValue = document.querySelector(".rsa-oaep .decrypted-value");
		// decryptedValue.classList.add("fade-in");
// 		decryptedValue.addEventListener("animationend", () => {
// 			decryptedValue.classList.remove("fade-in");
// 		});
		decryptedValue.textContent = dec.decode(decrypted);
	}

	/*
  Generate an encryption key pair, then set up event listeners
  on the "Encrypt" and "Decrypt" buttons.
  */
	window.crypto.subtle
		.generateKey(
			{
				name: "RSA-OAEP",
				// Consider using a 4096-bit key for systems that require long-term security
				modulusLength: 2048,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: "SHA-256"
			},
			true,
			["encrypt", "decrypt"]
		)
		.then((keyPair) => {
			const encryptButton = document.querySelector(".rsa-oaep .encrypt-button");
			encryptButton.addEventListener("click", () => {
			console.log(keyPair.publicKey.algorithm);
			console.log(keyPair.publicKey);
				encryptMessage(keyPair.publicKey);
			});

			const decryptButton = document.querySelector(".rsa-oaep .decrypt-button");
			decryptButton.addEventListener("click", () => {
				decryptMessage(keyPair.privateKey);
			});
			
			const publicKeyExportButton = document.querySelector(".rsa-oaep .publicKey-export");
			publicKeyExportButton.addEventListener("click", () => {
			  exportPublicKey(keyPair.publicKey);
			});
			// exportPrivateKey
			const privateKeyExportButton = document.querySelector(".rsa-oaep .privateKey-export");
			privateKeyExportButton.addEventListener("click", () => {
			  exportPrivateKey(keyPair.privateKey);
			});
		});
})();

