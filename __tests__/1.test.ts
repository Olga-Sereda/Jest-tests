


describe('activeListItem', () => {
  it('test1', () => {
    document.body.innerHTML = `
        <input id="newTodoInput" />
        <button id="addTodoBtn">Add todo</button>
        <ol id="todoList"></ol>
    `;
    const input = document.getElementById('newTodoInput')
    expect(input).toBeTruthy()
  })
});