export const html = `
<!DOCTYPE html >
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>MY APP</title>
</head>

<body>
    <h1> May Node and Express be with you. </h1>
    <h2> Routes available</h2>
    <li> get /test - Foo Bar and Time </li>
    <li> post /quotes - Quote submit (below form) </li>
    <li> post /login -  </li>
    <li> get /article/:id  -  </li>
    <li> put /article/:id  -  </li>
    <br>
    <div>
        <h2>Submit your quote (POST /quotes)</h2>    
        <form action="/quotes" method="POST">
            <input type="text" placeholder="name" name="name">
            <input type="text" placeholder="quote" name="quote">
            <button type="submit">Submit</button>
        </form>
    </div>
</body>

</html>
`;