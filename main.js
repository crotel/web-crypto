// const  = (
// function getyear(){return new Date().getFullYear()};
// const gy = getyear();
// console.log(gy,getyear())
var frame = null;
const jit = {
	switch : (e) => {
		switch (e) {
			case null: {
				jit.header()
				frame = document.createElement("iframe")
				break;
			}
			case 'derive-bits': {
				$("div#frame").innerHTML = "";
				jit.derive_bits()
				break;
			}
			case 'derive-key': {
				$("div#frame").innerHTML = "";
				jit.derive_key()
				break;
			}
			case 'encrypt-decrypt': {
				$("div#frame").innerHTML = "";
				jit.encrypt_decrypt()
				break;
			}
			case 'export-key': {
				$("div#frame").innerHTML = "";
				jit.export_key()
				break;
			}
			case 'import-key': {
				$("div#frame").innerHTML = "";
				jit.import_key()
				break;
			}
			case 'sign-verify': {
				$("div#frame").innerHTML = "";
				jit.sign_verify()
				break;
			}
			case 'unwrap-key': {
				$("div#frame").innerHTML = "";
				jit.unwrap_key()
				break;
			}
			case 'wrap-key': {
				$("div#frame").innerHTML = "";
				jit.wrap_key()
				break;
			}
			case 'unwrap-key': {
				$("div#frame").innerHTML = "";
				jit.unwrap_key()
				break;
			}
			case 'current': {
				$("div#frame").innerHTML = "";
				jit.current()
				break;
			}
			case 'md5': {
				$("div#frame").innerHTML = "";
				jit.md5()
				break;
			}
			case 'compatibility': {
				$("div#frame").innerHTML = "";
				jit.compatibility()
				break;
			}
			default: {
				jit.header()
				frame = document.createElement("iframe")
				break;
			}
		}
	},
	header: function() {
	// var getyear = new Date().getFullYear();
	let ref,
    // function getyear(){return new Date().getFullYear()};
    render = function (output) {
    	$('section#current').innerHTML = output;
    	// window.document.style.cssText = 'color:red;'
    	const style = document.createElement('style');
    	style.innerHTML = `
    	/** {
    		color: white;
    		background-color: black;
    		width: 150px;
    		height: 40px;
    	}*/
    	iframe::-webkit-scrollbar {
    		display: none;
    		width:0;
    		background-color:transparent;
    	}
    	iframe{
    		-ms-overflow-style: none;  /* IE and Edge */
    		scrollbar-width: none;  /* Firefox */
    	}
    	iframe {
    		height: calc(100vh - 6rem);
    		float: right;
    		width: calc(100vw - 10rem);
    		border:0
    	}
    	html{
    		text-align: center;
    	}
    	p.btn{
    		width: fit-content;
    		border: 1px solid #777;
    		padding: 0.5rem;
    		border-radius: 5px;
    		/*margin: 0.5rem auto;*/
    	}
    	`;
    	document.head.appendChild(style);
      // $('.description-c').innerText = getyear;
      
  };
  render((ref = function EOF() {
        /*!<<<EOF <div class="container">
        <h1 class="title-c" style="">WEB-CRYPTO</h1>
        <span class="description" style="">for web-crypto tesing</span>
        <div>
        <div id="frame"></div>
        <p class="btn" for="current" href="/current/index.html">current dev</p>
        <p class="btn" for="derive-bits" href="/derive-bits/index.html">derive-bits</p>
	    <p class="btn" for="derive-key" href="/derive-key/index.html">derive-key</p>
	    <p class="btn" for="encrypt-decrypt" href="/encrypt-decrypt/index.html">encrypt-decrypt</p>
	    <p class="btn" for="export-key" href="/export-key/index.html">export-key</p>
	    <p class="btn" for="import-key" href="/import-key/index.html">import-key</p>
	    <p class="btn" for="sign-verify" href="/sign-verify/index.html">sign-verify</p>
	    <p class="btn" for="unwrap-key" href="/unwrap-key/index.html">unwrap-key</p>
	    <p class="btn" for="wrap-key" href="/wrap-key/index.html">wrap-key</p>
	    <p class="btn" for="md5" href="/md5/index.html">md5</p>
	    <p class="btn" for="compatibility" href="/compatibility/index.html">compatibility</p>
	    
    </div>
    
EOF
*/
}).toString().split(ref.name)[2].replace(/\$\{([^}]+)\}/g,(outer, inner, pos) => {return this[inner]})

  )
},
append: function(e){
	return $("div#frame").appendChild(e);
},
derive_key: function() {
	frame.src = "derive-key/index.html";
	return jit.append(frame)
},
derive_bits: function() {
	frame.src = "derive-bits/index.html";
	return jit.append(frame)
},
encrypt_decrypt: function() {
	frame.src = "encrypt-decrypt/index.html";
	return jit.append(frame)
},
export_key: function() {
	frame.src = "export-key/index.html";
	return jit.append(frame)
},
import_key: function() {
	frame.src = "import-key/index.html";
	return jit.append(frame)
},
sign_verify: function() {
	frame.src = "sign-verify/index.html";
	return jit.append(frame)
},
unwrap_key: function() {
	frame.src = "unwrap-key/index.html";
	return jit.append(frame)
},
wrap_key: function() {
	frame.src = "wrap-key/index.html";
	return jit.append(frame)
},
current: function() {
	frame.src = "current/index.html";
	return jit.append(frame)
},
md5: function() {
	frame.src = "md5/index.html";
	return jit.append(frame)
},
compatibility: function() {
	frame.src = "compatibility/index.html";
	return jit.append(frame)
}

}
window.onload = function () {
	jit.switch()
    // jit.switch(window.sessionStorage.getItem("current"));
};
window.addEventListener("click",(e)=>{
	e.preventDefault();
	let targets = ["derive-bits", "derive-key", "encrypt-decrypt", "export-key", "import-key", "sign-verify", "unwrap-key", "wrap-key", "page-enter", "current", "md5", "compatibility"];
	for (i of targets) {
		if (e.target.getAttribute("for") === i) {
			jit.switch(i)
		}
	}
  	// console.log(e.target.getAttribute("for")!==undefined)
  	// console.log(e.target)

  })

