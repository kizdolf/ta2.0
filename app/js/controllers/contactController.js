var contactCtrl =  function($http, getData, $scope, $sce){
	
	$scope.txt_btn = "Envoyer le message.";

	getData.contact().then(function(data){
		$scope.text = $sce.trustAsHtml(data.data.text);
	});

	Recaptcha.create("6LejkfkSAAAAAFzdmV65iEt7omLdnJXZoMpMVw3e",
		"captcha",
		{
		 	theme: "red",
		});

	$scope.send_msg = function(msg){

		$scope.message = "";
		$scope.txt_btn = "Verification en cour..."
		
		var rep = Recaptcha.get_response();
		var chal = Recaptcha.get_challenge();
		
		$scope.tosend = msg;

		$http.get('API/api.php?get=captcha&rep=' + rep + '&chal=' + chal).then(function(data){
			if(data.data == "true"){
				$scope.txt_btn = "Verification ok! Envoi en cour."
				//Utilisation de jquery car le post d'angular est foireux (demande l'ajout de centaines de lignes de code...)
				$.post( "API/contact.php", { mail: $scope.tosend.email, 
																		subject: $scope.tosend.subject,
																		txt: $scope.tosend.txt} )
				.done(function(data){
				
					if(data != "true"){
						$("#message").html(data);
						$('.btn_send').html("Renvoyer le message");
					}
					else{
						$("#message").html(" ");
						$('.btn_send').html("Message envoyé!");
					}
				
				});
			}else{
				$scope.message = "Vérification échouée. Veuillez entrer le code à nouveau.";
				$scope.txt_btn = "Renvoyer le message.";
				Recaptcha.reload();
				Recaptcha.focus_response_field();
			}
		});
	};
}