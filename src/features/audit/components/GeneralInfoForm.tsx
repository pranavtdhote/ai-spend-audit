import { Label, Select, Input } from '@/components/ui';
import { useAuditStore } from '../store/useAuditStore';
import type { UseCase } from '../types';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';

export function GeneralInfoForm() {
  const { generalInfo, setGeneralInfo } = useAuditStore();

  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-100">Team Details</h3>
        <p className="text-sm text-neutral-400">
          This helps us benchmark your spend against similar startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="teamSize">Total Team Size</Label>
          <Input
            id="teamSize"
            type="number"
            min="1"
            placeholder="e.g. 15"
            value={generalInfo.teamSize}
            onChange={(e) =>
              setGeneralInfo({
                teamSize: e.target.value ? parseInt(e.target.value) : '',
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryUseCase">Primary AI Use Case</Label>
          <Select
            id="primaryUseCase"
            value={generalInfo.primaryUseCase}
            onChange={(e) =>
              setGeneralInfo({ primaryUseCase: e.target.value as UseCase })
            }
          >
            <option value="" disabled>
              Select use case
            </option>
            <option value="coding">Engineering & Coding</option>
            <option value="writing">Content & Writing</option>
            <option value="research">Research & Analysis</option>
            <option value="data">Data Processing</option>
            <option value="mixed">Mixed / General</option>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
