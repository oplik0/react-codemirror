"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[4247],{4247:function(t,e,n){n.r(e),e.default='@{\n    var total = 0;\n    var totalMessage = "";\n    @* a multiline\n      razor comment embedded in csharp *@\n    if (IsPost) {\n\n        // Retrieve the numbers that the user entered.\n        var num1 = Request["text1"];\n        var num2 = Request["text2"];\n\n        // Convert the entered strings into integers numbers and add.\n        total = num1.AsInt() + num2.AsInt();\n    <italic><bold>totalMessage = "Total = " + total;</bold></italic>\n    }\n}\n\n<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>Add Numbers</title>\n    <meta charset="utf-8" />\n  </head>\n<body>\n  <p>Enter two whole numbers and then click <strong>Add</strong>.</p>\n  <form action="" method="post">\n    <p><label for="text1">First Number:</label>\n      <input type="text" name="text1" />\n    </p>\n    <p><label for="text2">Second Number:</label>\n      <input type="text" name="text2" />\n    </p>\n    <p><input type="submit" value="Add" /></p>\n  </form>\n\n  @* now we call the totalMessage method \n     (a multi line razor comment outside code) *@\n\n  <p>@totalMessage</p>\n  \n  <p>@(totalMessage+"!")</p>\n  \n  An email address (with escaped at character): name@@domain.com\n \n</body>\n</html>\n'}}]);
//# sourceMappingURL=4247.61560119.chunk.js.map