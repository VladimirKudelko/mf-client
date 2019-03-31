import { MenuItem } from '../models';
import { faHome, faPlus, faMinus, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

export const navItems: MenuItem[] = [
  { title: 'HOME', link: '/dashboard/home', icon: faHome },
  { title: 'Expenses', link: '/dashboard/expenses', icon: faPlus },
  { title: 'Incomes', link: '/dashboard/incomes', icon: faMinus },
  { title: 'Statistic', link: '/dashboard/statistic', icon: faChartBar },
  { title: 'Settings', link: '/dashboard/settings', icon: faCog }
];
