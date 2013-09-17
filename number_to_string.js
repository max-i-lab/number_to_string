function number_to_string(input_value)
{
	var Units = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
	var Tens = ["", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто", "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятьнадцать", "шестьнадцать", "семьнадцать", "восемьнадцать", "девятнадцать"];
	var Hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
	var DigitNumber = ["", "тысяч", "миллион", "миллиард", "триллион", "квадриллион", "квинтиллион"];

	function stringReverse(string)
	{
		var string_Reverse = "";

		for(var charCounter = string.length - 1; charCounter >= 0; charCounter--)
		{
			string_Reverse += string.charAt(charCounter);
		}

		return string_Reverse;
	}

	function getEnding(last_number, triads_number)
	{
		if(triads_number !== 0)
		{
			switch(triads_number)
			{
				case 1:
					//окончание для тысяч
					if(last_number === 1)
					{
						ending = "a";
					}
					if(last_number > 1 && last_number <= 4)
					{
						ending = "и";
					}
					if(last_number > 4 && last_number < 21)
					{
						ending = "";
					}
					break;
				default:
					//окончание для миллионов и больше
					if(last_number > 1 && last_number <= 4)
					{
						ending = "а";
					}
					if(last_number > 4 && last_number < 21)
					{
						ending = "ов";
					}
			}
		}
		else
		{
			ending = "";
		}

		return ending;
	}

	var str_number = String(input_value);
	var str_number_length = str_number.length;

	var quantity_triads_in_number = Math.floor(str_number_length / 3);//1234768 = 1 234 768 => 3 triads

	if(quantity_triads_in_number * 3 != str_number_length)
	{
		quantity_triads_in_number++;
	}

	var Triads = [];
	var stringTriads = "";
	var str_number_reverse = stringReverse(str_number);

	for(var triads_counter = 0; triads_counter < quantity_triads_in_number; triads_counter++)
	{
		Triads[triads_counter] = str_number_reverse.substr(triads_counter * 3, 3);
	}

	for(var triads_counter = Triads.length - 1; triads_counter >= 0; triads_counter--)
	{
		var tens = "";
		var units = "";

		var triad = Triads[triads_counter];
		var ending = "";

		var char_hundreds = parseInt(triad.charAt(2), 10);
		var char_tens = parseInt(triad.charAt(1), 10);
		var char_units = parseInt(triad.charAt(0), 10);

		if(char_hundreds)
		{
			stringTriads += Hundreds[Number(char_hundreds)];//Пишем сотни в строку
			if(char_tens || char_units || triads_counter != 0)
			{
				stringTriads += " ";
			}
		}
		if(char_tens)
		{
			if(char_units)
			{
				var str_TensAndUnits = String(char_tens) + String(char_units);
				var num_TensAndUnis = Number(str_TensAndUnits);
				var num_last_char = Number(char_units);

				if(num_TensAndUnis > 10 && num_TensAndUnis < 20)
				{
					tens = Tens[num_TensAndUnis];//получаем названия десятков для чисел от 10 до 19
					ending = getEnding(num_TensAndUnis, triads_counter);
				}
				else
				{//для чисел <11 и >19
					ending = getEnding(Number(char_units), triads_counter);

					if(triads_counter === 1)
					{//Для тысяч
						if(num_last_char === 1)
						{
							units = "одна";
						}
						else
						{
							if(num_last_char === 2)
							{
								units = "две";
							}
							else
							{
								units = Units[num_last_char];
							}
						}
					}
					else
					{//Для остальных чисел
						units = Units[num_last_char];
					}

					tens = Tens[Number(char_tens)];
				}
			}
			else
			{   //если нет единиц
				tens = Tens[Number(char_tens)];
			}
		}
		else
		{//Если не десятков
			if(char_units)
			{
				var num_last_char = Number(char_units);

				if(triads_counter !== 0)
				{
					ending = getEnding(num_last_char, triads_counter);
				}
				if(triads_counter === 1)
				{//Для тысяч
					if(num_last_char === 1)
					{
						units = "одна";
					}
					else
					{
						if(num_last_char === 2)
						{
							units = "две";
						}
						else
						{
							units = Units[num_last_char];
						}
					}
				}
				else
				{//Для остальных чисел
					units = Units[num_last_char];
				}
			}
		}

		stringTriads += (tens ? tens +(units ? " " : ""): "");
		stringTriads += (units ? units : "");
		stringTriads += (triads_counter != 0 ? " " + DigitNumber[triads_counter] + ending + " " : "");
	}

	return stringTriads;
}
