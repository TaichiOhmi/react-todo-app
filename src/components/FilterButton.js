import React from 'react';

function FilterButton(props){
    return (
        <button type="button" className="btn toggle-btn" aria-pressed="true">
        {/* aria-pressedは、ボタンが押されているか押されていないかの2つの状態のいずれかになり得ることを支援技術（スクリーンリーダーなど）に通知します。これらをオンとオフのアナログと考えてください。 trueの値を設定すると、デフォルトでボタンが押されます。 */}
        {/* visually-hidden は目の見える人には必要がないため、隠されるが、見えない人々のためにスクリーンリーダー等では表示される。 */}
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    )
}

export default FilterButton;