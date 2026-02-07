"use client";

import { Card, CardBody, Skeleton } from "@nextui-org/react";

export default function DonorsSkeleton() {
  return (
    <div className="mx-21 my-10 flex flex-wrap justify-center gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <Card
          key={index}
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[280px] w-full"
          shadow="sm"
        >
          <CardBody className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Avatar skeleton */}
              <Skeleton className="w-16 h-16 rounded-full" />

              {/* Name and date skeleton */}
              <div className="flex flex-col gap-2 w-full items-center">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>

              {/* Amount skeleton */}
              <div className="flex flex-col items-center gap-1 w-full">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-3 w-16 rounded-lg" />
              </div>

              {/* Platform badge skeleton */}
              <Skeleton className="h-7 w-40 rounded-full" />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
