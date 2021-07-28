  API_KEY = "45b0e67815msh8f5fb5c3ed095a7p126d59jsn243789654347"; // Get yours for free at https://judge0.com/ce or https://judge0.com/extra-ce

        // var language_to_id = {
        //     "Bash": 46,
        //     "C": 50,
        //     "C#": 51,
        //     "C++": 54,
        //     "Java": 62,
        //     "Python": 71,
        //     "Ruby": 72
        // };

       

        function run() {
            $("#run").prop("disabled", true);
            $("#output").val("⚙️ Creating submission...");

            let encodedExpectedOutput = encode($("#expected-output").val());
            if (encodedExpectedOutput === "") {
                encodedExpectedOutput = null; // Assume that user does not want to use expected output if it is empty.
            }

            $.ajax({
                url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false",
                type: "POST",
                contentType: "application/json",
                headers: {
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
	                "x-rapidapi-key": API_KEY
                },
                data: JSON.stringify({
                    "language_id": 71,
                    // language_to_id[$("#lang").val()]
                    "source_code": encode(editor.getValue()),
                    "stdin": encode($("#input").val()),
                    "expected_output": encodedExpectedOutput,
                    "redirect_stderr_to_stdout": true
                }),
                success: function(data, textStatus, jqXHR) {
                    $("#output").val($("#output").val() + "\n🎉 Submission created.");
                    setTimeout(function() { check(data["token"]) }, 2000);
                },
                error: errorHandler
            });
        }

        

        $("#source").focus();
