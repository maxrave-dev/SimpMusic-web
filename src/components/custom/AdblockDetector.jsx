'use client';

import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import {DetectAdblock} from "@scthakuri/adblock-detector";

const AdblockDetectorComponent = () => {

  const [startDetect, setStartDetect] = useState(true);
  const [detected, setDetected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (startDetect) {
      console.log("Starting Adblock Detector");
      DetectAdblock((enable) => {
        setStartDetect(false);
        setDetected(enable);
        console.log("Adblock detected:", enable);

        if (enable) {
          setShowModal(true);
        }
      });
    }
  }, [startDetect])

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!showModal) {
    return null;
  } else {
    return (
        <Modal
            isOpen={detected}
            isDismissable={false}
            hideCloseButton={true}
            backdrop="blur"
            classNames={{
              backdrop: 'bg-black/80',
              base: 'border border-default-200 bg-background',
            }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-warning"
                >
                  <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                  />
                </svg>
                <span className="text-xl font-bold">Ad Blocker Detected</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-default-600">
                We noticed that you&apos;re using an ad blocker. We rely on
                advertising revenue to keep SimpMusic free and continuously
                improve our services.
              </p>
              <p className="text-default-600 mt-2">
                Please consider disabling your ad blocker for this site to
                support us. Your understanding helps us maintain and develop new
                features for you.
              </p>
              <div className="mt-4 p-4 bg-default-100 rounded-lg">
                <p className="text-sm font-semibold mb-2">How to disable ad blocker:</p>
                <ol className="text-sm text-default-500 list-decimal list-inside space-y-1">
                  <li>Click on your ad blocker extension icon</li>
                  <li>Select &quot;Disable on this site&quot; or similar option</li>
                  <li>Refresh the page</li>
                </ol>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                  color="primary"
                  variant="shadow"
                  onPress={handleRefresh}
                  className="w-full font-semibold"
              >
                I&apos;ve Disabled Ad Blocker - Refresh Page
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    );
  }
};

export default AdblockDetectorComponent;
