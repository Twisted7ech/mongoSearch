$(document).ready(function () {
    $('#title').autocomplete({
        source: async function(request,response) {
            let data= await fetch(`http://localhost:8000/search?query=${request.term}`)
                    .then(results => results.json())
                    .then(results => results.map(result => {
                        return {
                            label: result.title,
                            value: result.title,
                            id: result._id
                        }
                    }))
                response(data)
                //console.log(response)
        },
        minLength: 2,
        select: function(event, ui) {
            console.log(ui.item.id)
            fetch(`http://localhost:8000/get/${ui.item.id}`)
                .then(result => result.json())
                .then(result => {
                    console.log(result)
                    let title = result.title
                    $('#episodeTitle').text(title)
                    let episode = result.episode
                    $('#episode').text(episode)

                    let script = result.script
                    let scriptArr = script.split('\\n\\n')
                    $('#script').empty()
                    scriptArr.forEach(line => {
                        $('#script').append(`<li>${line}</li>`)
                    })

                    let characters = []
                    for (let i = 0; i<scriptArr.length;i++){
                        let divide = scriptArr[i].split(': ')
                        if (!characters.includes(divide[0]) && divide[1]){
                            characters.push(divide[0])
                        }
                    }
                    $('#cast').empty()
                    characters.forEach(cast =>
                        {
                            $('#cast').append(`<li><img src="./${cast}.jpg"</li><li>${cast}</li>`)
                        })
                        $('img').attr('src',result.poster)
                    // characters.forEach(char => {
                    //     $('#images').append(`<li><img src="./${char}.jpg"</li>`)
                    // })
                })
        }
    })
})