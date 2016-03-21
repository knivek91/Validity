var jq = $(document);

var Person = function() {

	return {

		validateForm: function validateForm(inputs) {
			
			var attrs = null;
			var $this = this;

			 $.validity.start();

			inputs.forEach(function(input, index) {
			
				attrs = $this.getAttrInput(input);

				attrs.forEach(function(validate, index) {

					switch (validate.key) {
						case "required":
							input.require('Ingrese la información solicitada.');
							break;

						case "maxLength":
							if (input.val().length > parseInt(validate.value, 10))
								input.maxLength(parseInt(validate.value, 10));
							break;
						case "max":
							input.match('number')
								 .lessThanOrEqualTo(validate.value,'El valor maximo es de: ');
								 break;

						case "min":
							input.greaterThanOrEqualTo(validate.value,'El valor minimo es de: ' + validate.value);
							break;

						case "pattern":
						break;
							
					}
				});

			});
			var result = $.validity.end();

			return result.valid;

		}
		, getAttrInput: function getAttrInput(input) {

			var attrs = [];

			if (input[0].required)
				attrs.push({'key':'required', 'value': input[0].required});
			
			if(input[0].maxLength > -1)
				attrs.push({'key':'maxLength', 'value': input[0].maxLength});

			if(input[0].max != '')
				attrs.push({'key':'max', 'value': input[0].max});

			if(input[0].min != '')
				attrs.push({'key':'min', 'value': input[0].min});

			if(input[0].pattern != '')
			attrs.push({'key':'pattern', 'value': input[0].pattern});

			return attrs;
		}
	};
};

jq.find('button').on('click', function() {

	try	{

		var inputs 			= [];
		var txtName 		= jq.find('input[name="txtName"]');
		var txtAge 			= jq.find('input[name="txtAge"]');
		var txtCellPhone 	= jq.find('input[name="txtCellPhone"]');
		var txtLiveIn 		= jq.find('input[name="txtLiveIn"]');

		inputs.push(txtName);
		inputs.push(txtAge);
		inputs.push(txtCellPhone);
		inputs.push(txtLiveIn);

		let myPerson 		= Person();
		let valid 			= myPerson.validateForm(inputs);

		console.log(valid);

	} catch(err) { console.log(err); }

});