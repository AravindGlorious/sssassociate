import { whatsappLink } from '@/config/business';

export function WhatsAppButton() {
  return (
    <a className="wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Us on WhatsApp">
      <span aria-hidden="true">Chat with Us on WhatsApp</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm0 18.200c-1.500 0-3-.4-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100-1.300-.6-2.200-1.200-3-2.700-.2-.4.200-.4.600-1.200.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.8.800-1.100 1.700-.8 2.900.3 1.100 1.100 2.100 2.600 3.400 1.800 1.600 3.100 2 4 2.200.9.200 1.800 0 2.400-.5.400-.4.600-1 .5-1.500 0-.2-.2-.3-.4-.4z" />
      </svg>
    </a>
  );
}
