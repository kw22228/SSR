export const store = {
    state: {
        todoItems: [
            {
                id: 1,
                content: 'CSR을 만들어보자!',
                active: true,
            },
            {
                id: 2,
                content: 'CSR 코드분할',
                active: false,
            },
            {
                id: 3,
                content: 'SSR을 만들어보자',
                active: false,
            },
        ],
    },
    setState(newState) {
        this.state = { ...this.state, ...newState };
    },

    activeToggle(index) {
        const todoItems = [...this.state.todoItems];

        todoItems[index].active = !todoItems[index].active;
        this.setState({ todoItems });
    },
};
