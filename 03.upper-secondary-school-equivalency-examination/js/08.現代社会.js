// 正しい答えを設定
const correctAnswers = {
    q1: '1', // 1番の正解は1
    q2: '3', // 2番の正解は3
    q3: '3',
    q4: '1',
    q5: '2',
    q6: '3',
    q7: '4',
    q8: '3',
    q9: '2',
    q10: '2',
    q11: '1',
    q12: '2',
    q13: '1',
    q14: '3',
    q15: '4',
    q16: '4',
    q17: '1',
    q18: '2',
    q19: '2',
    q20: '4',
    q21: '1',
    q22: '2',
    q23: '4',
    q24: '3',
    // 必要に応じて追加
};

const points = {
    q1: 4, // 問題1の配点は4点
    q2: 4, // 問題2の配点は4点
    q3: 4,
    q4: 4,
    q5: 5,
    q6: 4,
    q7: 5,
    q8: 4,
    q9: 4,
    q10: 4,
    q11: 4,
    q12: 4,
    q13: 4,
    q14: 4,
    q13: 4,
    q14: 4,
    q15: 4,
    q16: 4,
    q17: 5,
    q18: 4,
    q19: 4,
    q20: 5,
    q21: 4,
    q22: 4,
    q23: 4,
    q24: 4,
    // 必要に応じて追加
};

// 解答の読み込み（ページ読み込み時）
window.addEventListener('load', () => {
    loadAnswers();
});

// 正誤判定ボタンのクリックイベント
document.getElementById('check-button').addEventListener('click', () => {
    let totalScore = 0;               // 合計得点
    let totalPossibleScore = 0;       // 可能な最大得点
    let correctCount = 0;             // 正解数
    let totalQuestions = Object.keys(correctAnswers).length; // 問題数

    // 正誤判定と得点計算
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        totalPossibleScore += points[question]; // 各問題の配点を合計

        if (selected) {
            // 選択された解答をlocalStorageに保存
            localStorage.setItem(question, selected.value);
        }

        if (selected && selected.value === correctAnswer) {
            totalScore += points[question]; // 正解の場合、問題の配点を加算
            correctCount++;                 // 正解数をカウント
        }
    }

    // 結果をlocalStorageに保存
    localStorage.setItem('correctCount', correctCount);
    localStorage.setItem('totalScore', totalScore);

    // 結果を表示
    displayResult(correctCount, totalQuestions, totalScore, totalPossibleScore);
});

// 解答の読み込み関数
function loadAnswers() {
    for (const question of Object.keys(correctAnswers)) {
        const savedAnswer = localStorage.getItem(question);
        if (savedAnswer) {
            const radioButton = document.querySelector(`input[name="${question}"][value="${savedAnswer}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }
        }
    }

    // 保存された結果の読み込み
    const savedCorrectCount = localStorage.getItem('correctCount');
    const savedTotalScore = localStorage.getItem('totalScore');

    if (savedCorrectCount !== null && savedTotalScore !== null) {
        const totalQuestions = Object.keys(correctAnswers).length;
        const totalPossibleScore = Object.values(points).reduce((acc, cur) => acc + cur, 0);
        displayResult(parseInt(savedCorrectCount), totalQuestions, parseInt(savedTotalScore), totalPossibleScore);
    }
}

// 結果を表示する関数
function displayResult(correctCount, totalQuestions, totalScore, totalPossibleScore) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `正解数: ${correctCount} / ${totalQuestions}, 得点: ${totalScore} / ${totalPossibleScore}`;
}