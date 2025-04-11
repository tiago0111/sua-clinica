document.addEventListener('DOMContentLoaded', function() {
    // Controle do Upload de PDF
    const pdfUpload = document.getElementById('pdf-upload');
    const pdfPreview = document.getElementById('pdf-preview');
    
    pdfUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.type !== 'application/pdf') {
            showError('Por favor, envie um arquivo PDF válido.');
            return;
        }
        
        pdfPreview.innerHTML = '<p>Processando PDF... <span class="loading"></span></p>';
        
        // Simulação de processamento (substituir por API real)
        setTimeout(() => {
            const mockData = {
                nome: 'João Silva',
                valor: '125,00€',
                nif: '123456789',
                data: new Date().toLocaleDateString('pt-PT')
            };
            showResult(mockData);
        }, 1500);
    });
    
    function showResult(data) {
        pdfPreview.innerHTML = `
            <div class="result">
                <h3>Dados Extraídos</h3>
                <div class="result-field">
                    <span>Nome:</span>
                    <strong>${data.nome}</strong>
                </div>
                <div class="result-field">
                    <span>Valor:</span>
                    <strong>${data.valor}</strong>
                </div>
                <div class="result-field">
                    <span>NIF:</span>
                    <strong>${data.nif}</strong>
                </div>
                <button class="btn btn-primary">Gerar Formulário ADSE</button>
            </div>
        `;
    }
    
    function showError(message) {
        pdfPreview.innerHTML = `
            <div class="error">
                <p>${message}</p>
            </div>
        `;
    }
});