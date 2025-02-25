document.addEventListener("DOMContentLoaded", async () => {
    const add_memo = document.getElementById("add-memo");
    const memo_list = document.getElementById("memo-list");
    const memo_editor = document.getElementById("memo-editor");

    let memo_text = {};

    // ページ読み込み時にメモを取得
    const loadMemos = async () => {
        const response = await fetch('./load-memos.php');
        const memos = await response.json();
        memos.forEach((memo) => {
            createMemoElement(memo.id, memo.title, memo.content);
        });
    };

    // 新しいメモの作成
    const createMemoElement = (memo_id, title, content = '') => {
        const memo = document.createElement("div");
        memo.className = "memo";
        memo.dataset.id = memo_id;
        memo.textContent = title;
        memo_list.appendChild(memo);

        memo_text[memo_id] = content;

        memo.addEventListener("click", () => {
            memo_editor.innerHTML = "";
            const textarea = document.createElement("textarea");
            textarea.className = "post";
            textarea.value = memo_text[memo_id];
            memo_editor.appendChild(textarea);
            textarea.focus();

            // メモが編集された場合
            textarea.addEventListener("input", async () => {
                memo_text[memo_id] = textarea.value;

                // データベースに更新を送信
                await fetch('./update-memo.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: memo_id,
                        content: memo_text[memo_id],
                    }),
                });
            });
        });
    };

    // 新しいメモボタンのクリック
    add_memo.addEventListener("click", async () => {
        const memo_id = `${Date.now()}`;
        const title = "新しいメモ";
    
        try {
            const response = await fetch('./add-memo.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: memo_id, title, content: '' }),
            });
    
            const result = await response.json();
    
            if (result.status === 'success') {
                createMemoElement(memo_id, title);
            } else {
                // エラーメッセージを表示
                console.error(result.message);
                alert(result.message || 'メモの作成に失敗しました');
            }
        } catch (error) {
            console.error('メモ作成エラー:', error);
            alert('通信エラーが発生しました');
        }
    });
    
    // 初期ロード
    await loadMemos();
});

