document.addEventListener('DOMContentLoaded', () => {

    // === Funcionalidade de Tema Escuro ===
    // (Este bloco é independente e deve ser executado em todas as páginas)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Função para aplicar o tema com base na preferência salva no localStorage
    function applyThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            // Se não houver preferência ou for 'light', garante o tema claro
            body.classList.remove('dark-theme');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // Aplica o tema na primeira carga da página
    applyThemePreference();

    // Adiciona event listener APENAS se o botão de tema existir na página
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }


    // === Funcionalidade do Gerador de Senhas ===
    // (Este bloco SÓ será executado se o elemento 'passwordOutput' existir na página)
    const passwordOutput = document.getElementById('passwordOutput');

    if (passwordOutput) { // <-- VERIFICA SE ESTAMOS NA PÁGINA DO GERADOR DE SENHAS
        const copyButton = document.getElementById('copyButton');
        const passwordLengthInput = document.getElementById('passwordLength');
        const lengthValueSpan = document.getElementById('lengthValue');
        const includeUppercase = document.getElementById('includeUppercase');
        const includeLowercase = document.getElementById('includeLowercase');
        const includeNumbers = document.getElementById('includeNumbers');
        const includeSymbols = document.getElementById('includeSymbols');
        const generateButton = document.getElementById('generateButton');
        const messageArea = document.getElementById('messageArea');

        // Caracteres possíveis
        const chars = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
        };

        // Atualiza o valor do slider na tela
        passwordLengthInput.addEventListener('input', () => {
            lengthValueSpan.textContent = passwordLengthInput.value;
        });

        // Função para gerar a senha
        function generatePassword() {
            messageArea.textContent = ''; // Limpa mensagens anteriores
            let availableChars = '';
            let generatedPassword = '';
            const length = parseInt(passwordLengthInput.value);

            if (includeUppercase.checked) {
                availableChars += chars.uppercase;
            }
            if (includeLowercase.checked) {
                availableChars += chars.lowercase;
            }
            if (includeNumbers.checked) {
                availableChars += chars.numbers;
            }
            if (includeSymbols.checked) {
                availableChars += chars.symbols;
            }

            if (availableChars === '') {
                messageArea.textContent = 'Selecione pelo menos um tipo de caractere!';
                messageArea.classList.add('error');
                passwordOutput.value = '';
                return;
            }

            // Garante que cada tipo de caractere selecionado esteja presente
            if (includeUppercase.checked) {
                generatedPassword += chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)];
            }
            if (includeLowercase.checked) {
                generatedPassword += chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)];
            }
            if (includeNumbers.checked) {
                generatedPassword += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];
            }
            if (includeSymbols.checked) {
                generatedPassword += chars.symbols[Math.floor(Math.random() * chars.symbols.length)];
            }

            // Preenche o restante da senha
            for (let i = generatedPassword.length; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * availableChars.length);
                generatedPassword += availableChars[randomIndex];
            }

            // Embaralha a senha
            generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

            passwordOutput.value = generatedPassword;
            messageArea.classList.remove('error');
        }

        // Evento do botão gerar
        generateButton.addEventListener('click', generatePassword);

        // Gera uma senha inicial ao carregar a página
        generatePassword();

        // Função para copiar a senha
        copyButton.addEventListener('click', () => {
            if (passwordOutput.value) {
                navigator.clipboard.writeText(passwordOutput.value)
                    .then(() => {
                        messageArea.textContent = 'Senha copiada!';
                        messageArea.classList.remove('error');
                        setTimeout(() => messageArea.textContent = '', 2000);
                    })
                    .catch(err => {
                        messageArea.textContent = 'Erro ao copiar a senha!';
                        messageArea.classList.add('error');
                        console.error('Erro ao copiar:', err);
                    });
            } else {
                messageArea.textContent = 'Não há senha para copiar!';
                messageArea.classList.add('error');
            }
        });

        // Opcional: Gera nova senha quando qualquer checkbox muda
        [includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(checkbox => {
            checkbox.addEventListener('change', generatePassword);
        });
    }

    // === Funcionalidade do Botão "Voltar" ===
    const backButton = document.getElementById('backButton');
    if (backButton) { // Verifica se o botão "Voltar" existe na página
        backButton.addEventListener('click', () => {
            window.history.back(); // Usa o histórico do navegador para voltar
        });
    }
});