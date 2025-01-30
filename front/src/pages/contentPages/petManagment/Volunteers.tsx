import { Button } from "@mui/material";
import { useAuth } from "../../../contexts/auth/useAuth";

export function Volunteers() {
  const { authChecker } = useAuth();
  return (
    <div className="flex flex-col flex-1 min-w-8 pt-60 mx-auto items-center justify-center gap-5">
      <Button
        variant="contained"
        type="submit"
        onClick={async () => {
          await authChecker();
        }}
      >
        Test
      </Button>
    </div>
  );
}
