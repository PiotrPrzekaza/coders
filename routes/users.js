function usersRoutes(app) {

    // STRUKTURA REST
    // app.get('/', (req) => {
    //     console.log('Spis ludzi');
    // });

    // app.get('/:id', (req) => {
    //     console.log('Informacja szczegółowa na temat osoby o ID ' + req.params.id)
    // });
    // app.get('/1', (req) => {
    // console.log("Informacja szczegółowa na temat osoby o ID 1");
    // });
    // app.post('/', (req) => {
    //     console.log('Dodawanie nowej osoby');
    // });
    // app.patch('/:id', (req) => {
    //     console.log('Aktualizacja osoby o ID ' + req.params.id);
    // });
    // app.delete('/:id', (req) => {
    //     console.log('Usuwanie osoby o ID ' + req.params.id);
    // });

    // odwrócona kolejność url i odbiur parametow 

    // app.get('/hello/new-user', (req) => {
    //     console.log('Dodawanie nowego użytkownika')
    // });
    // app.get('/hello/:name', (req) => {
    //     console.log('Hello,  ' + req.params.name);
    // });


    // obiekt response res.send()

    // app.get('/', (req, res) => {

    //     const str = 'Zażółć gęślą jaźń!';
    //     const ar = str.split(' ');

    //     res.send(ar)
    // })

    // res.json

    // app.get('/', (req, res) => {
    //     res.json("tylko text");
    // });

    //  przekierowanie 

    // app.get('/', (req, res) => {
    //     res.location('http://google.com');
    //     res.sendStatus(302)

    // });

    // app.get('/', (req, res) => {
    //     res.redirect('http://devcorp.pl');
    // });

    // Przesyłanie plików res.sendFile
    /*
    app.get('/', (req, res) => {
        res.send(`<!DOCTYPE html>
        <html>
        <body>
            <img src="/logo">
        </body>
        </html>`);
    });
    
    app.get('/logo', (req, res) => {
    
        const fileName = "name.png";
    
        res.sendFile(fileName, {
            root: path.join(__dirname, 'static') // zabiespiecza dostep do katalogów wyżej i skraca zapis w zmiennej
        })
    
        // const fileName = path.join(__dirname, "static/name.png");
    
        // res.sendFile(fileName)
    
    })
    */
    // nagłóki 


    // cookes

    app.get('/', (req, res) => {
        res.send('<h1>Strona Główna</h1>')
    });

    app.get('/hi/:name', (req, res) => {
        const { name } = req.params;

        const dt = new Date();
        dt.setDate(dt.getDate() + 7);

        res.cookie('visitor_name', name, {
            expires: dt,// ustawienie daty ważności ciasteczka
        });
        res.send('<h1>Imię zapisano.</h1>');
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('visitor_name');// wyczyszczenie ciasteczka
        res.redirect('/')
    })


    // middleware



    // app.post('/hello', (req, res) => {
    //     const { name, surname } = req.body;

    //     res.send(`Witaj ${name} ${surname}`);

    //     console.log(req.body);
    // });

}

module.exports = usersRoutes;