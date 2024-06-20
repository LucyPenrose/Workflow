function toggleCSVMenu() {
    const menu = document.getElementById("Hidden-Salja-Menu"); 
    menu.classList.toggle("csvmenu-visible");
    menu.classList.toggle("csvmenu-hidden");
}

document.getElementById('submitsalja-text').addEventListener('click', function() {
    console.log('Submit button clicked.');

    var inputText = document.getElementById('SaljaPageText').value.trim();
    console.log('SaljaPageText:', inputText);

    var patternRegex = /(\b\d{3}\.\d{3}\.\d{2}\b)[\s\S]*?Entrepôt[\s\S]*?\((\d+)\)[\s\S]*?\n[\s\S]*?\n(\d+)/g;
    var matches = [];
    var match;

    while ((match = patternRegex.exec(inputText)) !== null) {
        var pattern = match[1]; 
        var number = match[3]; 
        matches.push(pattern + ',' + number);
    }

    if (matches.length > 0) {
        var csvContent = matches.join('\n');
        console.log('CSV Content:', csvContent);

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'output.csv'); 
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } else {
        console.log('No matches found.');
    }
});
