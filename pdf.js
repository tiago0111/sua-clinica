// Configuração do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

document.getElementById('pdf-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
        alert("Por favor, envie um arquivo PDF");
        return;
    }

    const fileReader = new FileReader();
    
    fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        
        // Carregar o PDF
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            // Pegar a primeira página
            return pdf.getPage(1);
        }).then(function(page) {
            // Extrair texto
            return page.getTextContent();
        }).then(function(textContent) {
            const text = textContent.items.map(item => item.str).join(' ');
            processPDFText(text);
        }).catch(function(error) {
            console.error("Erro ao processar PDF:", error);
            alert("Erro ao processar o PDF. Por favor, tente novamente.");
        });
    };
    
    fileReader.readAsArrayBuffer(file);
});

function processPDFText(text) {
    // Simular processamento de dados (substituir por lógica real)
    const preview = document.getElementById('pdf-preview');
    preview.innerHTML = `
        <div class="result">
            <h3>Formulário ADSE Gerado</h3>
            <div class="form-field">
                <label>Nome do Paciente:</label>
                <p>${extractName(text)}</p>
            </div>
            <div class="form-field">
                <label>Número de Utente:</label>
                <p>${extractUtenteNumber(text)}</p>
            </div>
            <div class="form-field">
                <label>Valor:</label>
                <p>${extractValue(text)}</p>
            </div>
            <button class="cta-primary">Download do Formulário</button>
            <p class="upsell">Quer processamento automático com IA? <a href="pricing.html">Conheça nossos planos</a></p>
        </div>
    `;
    preview.classList.add('active');
}

// Funções auxiliares para extrair dados (simplificadas)
function extractName(text) {
    const match = text.match(/Nome:\s*(.+)/i) || text.match(/Paciente:\s*(.+)/i);
    return match ? match[1] : "Não encontrado";
}

function extractUtenteNumber(text) {
    const match = text.match(/Utente:\s*(\d+)/i) || text.match(/Nº:\s*(\d+)/i);
    return match ? match[1] : "Não encontrado";
}

function extractValue(text) {
    const match = text.match(/Valor:\s*(\d+,\d+)/i) || text.match(/Total:\s*(\d+,\d+)/i);
    return match ? match[1] + "€" : "Não encontrado";
}