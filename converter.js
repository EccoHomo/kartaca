const morse_code_table = {
			B: '-...',
			D: '-..',
			F: '..-.',
			G: '--.',
			H: '....',
			J: '.---',
			K: '-.-',
			M: '--',
			P: '.--.',
			Q: '--.-',
			U: '..-',
			V: '...-',
			W: '.--',
			X: '-..-',
			Y: '-.--',
			Z: '--..',
			0: '-----',
			1: '.----',
			2: '..---',
			3: '...--',
			4: '....-',
			5: '.....',
			6: '-....',
			7: '--...',
			8: '---..',
			9: '----.'
		}

		// MOST USED LATTERS IN ENGLISH WORDS
		var freq_letters = {
			E: '.',
			A: '.-',
			I: '..',
			N: '-.',
			O: '---',
			R: '.-.',
			S: '...',
			T: '-',
			C: '-.-.',
			L: '.-..'
		} 

		var i,j;
		const morse_objects = Object.entries(morse_code_table);
		const freq_letters_objects = Object.entries(freq_letters);
		var morse_objects_size = morse_objects.length;
		var freq_letters_size = freq_letters_objects.length;

module.exports = {
	latin_morse : function(data){
		var data = data.toUpperCase().split("");
		var data_size = data.length;
		var morse_code = [];


		for(i=0; i <= data_size; i++){
			var flag = 0;
			if(data[i] === " "){
				morse_code[i] = " / ";
			}
			if(flag == 0){
				for(j=0; j < freq_letters_size; j++){
					if(data[i] === freq_letters_objects[j][0]){
						morse_code[i] = freq_letters_objects[j][1];
						delete data[i];
					}
				}
				flag = 1;
			}
			if(flag == 1){
				for(j=0; j < morse_objects_size; j++){
					if(data[i] === morse_objects[j][0]){
						morse_code[i] = morse_objects[j][1];
						delete data[i];
					}
				}
			}
		}
		var str = morse_code.toString().replace(/,/g," ");
		return str;
	},

	morse_latin : function(data){
		var data = data.split(" ");
		var data_size = data.length;
		var latin_text = [];


		for(i=0; i <= data_size; i++){
			var flag = 0;
			if(data[i] === "/"){
				latin_text[i] = " ";
			}
			if(flag == 0){
				for(j=0; j < freq_letters_size; j++){
					if(data[i] === freq_letters_objects[j][1]){
						latin_text[i] = freq_letters_objects[j][0];
						delete data[i];
					}
				}
				flag = 1;
			}
			if(flag == 1){
				for(j=0; j < morse_objects_size; j++){
					if(data[i] === morse_objects[j][1]){
						latin_text[i] = morse_objects[j][0];
						delete data[i];
					}
				}
			}
		}
		var str = latin_text.toString().replace(/,/g,"");
		return str;
	}
};