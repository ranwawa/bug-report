import App from '../app.vue'
import { render, screen } from '@testing-library/vue'

it('should ', () => {
  render(App)
	expect(screen.getByText(/ranwawa/)).toBeTruthy();
});