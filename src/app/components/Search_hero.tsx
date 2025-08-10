import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import useLoginModal from '@/app/hooks/useLoginModal';

const SearchButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const loginModal = useLoginModal();

  const handleSearchClick = () => {
    if (session?.user) {
      // User is logged in, redirect to search page
      router.push('/search');
    } else {
      // User is not logged in, open login modal
      loginModal.onOpen();
    }
  };

  return (
    <Button
      variant="outline"
      className="bg-white/90 hover:bg-white text-black px-8 py-6"
      onClick={handleSearchClick}
    >
      SEARCH PROPERTIES
    </Button>
  );
};

export default SearchButton;