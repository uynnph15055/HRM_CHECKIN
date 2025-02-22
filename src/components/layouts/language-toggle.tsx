import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { AiOutlineGlobal } from 'react-icons/ai';

export function LanguageToggle() {
  const { t, i18n } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-12 px-0'>
          {i18n.language.toLocaleUpperCase()}
          &nbsp;
          <AiOutlineGlobal size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {t('language.selectYourLanguage', { defaultValue: 'Select your language' })}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={i18n.language === 'vi'}
          onCheckedChange={() => {
            i18n.changeLanguage('vi');
          }}
        >
          {t('language.vi', { defaultValue: 'Việt Nam' })}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={i18n.language === 'en'}
          onCheckedChange={() => {
            i18n.changeLanguage('en');
          }}
        >
          {t('language.en', { defaultValue: 'English' })}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
