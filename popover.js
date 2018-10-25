<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h3>Popover Example</h3>
  <p>Popovers are not CSS-only plugins, and must therefore be initialized with jQuery: select the specified element and call the popover() method.</p>
  <a href="#" data-toggle="popover" title="my Location" data-content="Like here we update the som ghistroy at the palce">Toggle popover</a>
</div>

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
</script>

</body>
</html>
