declare namespace google {
  namespace accounts.id {
    function initialize(options: { client_id: string, callback: (response: CredentialResponse) => void }): void;
    function renderButton(parent: HTMLElement, options: { theme: string, size: string }): void;

    interface CredentialResponse {
      credential: string;
      select_by: string;
    }
  }
}
