import { Shield, Plus } from "lucide-react";
import { LucideProps } from "lucide-react";

interface ShieldPlusProps extends Omit<LucideProps, 'ref'> {}

const ShieldPlus = ({ className, ...props }: ShieldPlusProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <Shield {...props} />
      <Plus 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        size={typeof props.size === 'number' ? props.size * 0.4 : 9.6}
        color={props.color}
      />
    </div>
  );
};

export default ShieldPlus;