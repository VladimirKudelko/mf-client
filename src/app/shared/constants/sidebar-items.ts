import { MenuItem } from '../models';
import { faHome, faPlus, faMinus, faChartBar, faCog, faPiggyBank } from '@fortawesome/free-solid-svg-icons';

export const NAV_ITEMS: MenuItem[] = [
  { title: 'Home', link: '/dashboard/home', icon: faHome },
  { title: 'Incomes', link: '/dashboard/incomes', icon: faPlus },
  { title: 'Expenses', link: '/dashboard/expenses', icon: faMinus },
  { title: 'Budgets', link: '/dashboard/budgets', icon: faPiggyBank },
  { title: 'Statistic', link: '/dashboard/statistic', icon: faChartBar },
  { title: 'Settings', link: '/dashboard/settings', icon: faCog },
];
