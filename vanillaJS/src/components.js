import { store } from './store';

export const TodoList = () => /*html*/ `
    <ul>
        ${store.state.todoItems.map(todoItem).join('')}
    </ul>
`;

export const TodoItem = ({ id, content, active }) => /*html*/ `
    <li data-id="${id}">
        <input type="checkbox" ${active ? 'checked' : ''} />
        <span ${active ? 'style="text-decoration: line-through"' : ''}>${content}</span>
    </li>
`;
